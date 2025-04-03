import { Request, Response, Router } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken"
import { db } from "../db";
import { action, availableTriggers, trigger, zap } from "../db/schema";
import { eq, inArray } from "drizzle-orm";
const jwtPassword = "SecR3t";

const router = Router();

export const zapCreateSchema = z.object({
    userId: z.number(),
    triggerId: z.string().uuid(),
    triggerMetaData: z.any().optional(),
    actions: z.array(
        z.object(
            {
                actionId: z.string().uuid(),
                actionMetaData: z.any().optional()
            }))
})

router.post("/", async (req: Request, res: Response): Promise<any> => {

    const parsedData = zapCreateSchema.safeParse(req.body);

    if (!parsedData.success) {
        return res.status(400).json({
            message: "Validation failed",
            errors: parsedData.error.flatten()
        })
    }

    const { userId, triggerId, actions, triggerMetaData } = parsedData.data;

    try {
        await db.transaction(async (tx) => {
            const [newZap] = await tx.insert(zap).values({ userId }).returning();

            const zapId = newZap.id

            await tx.insert(trigger).values({ zapId, triggerId }).returning();

            await tx.insert(action).values(actions.map((ac, idx) => ({
                zapId,
                actionId: ac.actionId,
                actionMetaData: ac.actionMetaData,
                sortingOrder: idx
            })));
        });

        return res.status(201).json({ message: "Zap created successfully" });
    } catch (error) {
        console.error("Error creating Zap:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

router.get("/", async (req: Request, res: Response): Promise<any> => {
    try {
        const zaps = await db
            .select({
                id: zap.id,
                userId: zap.userId,
                trigger: {
                    triggerId: trigger.triggerId,
                    metaData: trigger.metaData,
                    zapId: trigger.zapId
                },
            })
            .from(zap)
            .leftJoin(trigger, eq(trigger.zapId, zap.id))

        const zapIds = zaps.map(z => z.id);

        const actions = await db
            .select()
            .from(action)
            .where(inArray(action.zapId, zapIds));

        // console.log(`actions:-${JSON.stringify(actions)}`);
        // console.log(`zaps:-${JSON.stringify(zaps)}`);

        const result = zaps.map(zap => ({
            ...zap,
            action: actions.filter(a => a.zapId === zap.id)
        }))
        console.log(`result:-${JSON.stringify(result)}`);

        return res.status(200).send(result);
    } catch (error) {
        console.error("Error creating Zap:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

router.get("/:zapId", async (req: Request, res: Response): Promise<any> => {
    const zapId = req.params.zapId;
    try {
        const zapData = await db
            .select()
            .from(zap)
            .where(eq(zap.id, zapId))
            .leftJoin(trigger, eq(trigger.zapId, zap.id))

        if (!zapData.length) {
            return res.status(404).json({ message: "Zap not found" });
        }

        const zapDataId = zapData.map(z => z.zap.id);

        const actions = await db
            .select()
            .from(action)
            .where(inArray(action.zapId, zapDataId));

        const result = zapData.map(z => ({
            ...z,
            action: actions.filter(a => a.zapId === z.zap.id)
        }))

        console.log(`result:- ${JSON.stringify(result)}`);

        return res.status(200).send(result);
    } catch (error) {
        console.error("Error creating Zap:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});




export const zapRouter = router;    