// seed.ts
import { db } from "..";
import {
    user,
    zap,
    trigger,
    action,
    availableActions,
    availableTriggers,
    zapRuns,
    zapRunsOutbox
} from "../schema";

async function seedDatabase() {
    let counter = 5;
    console.warn("You are about to clear the database. Are you sure?");
    while (counter > 0) {
        console.log(`${counter}...`);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        counter--;
    }

    await db.transaction(async (tx) => {

        await tx.delete(zapRunsOutbox),
            await tx.delete(zapRuns),
            await tx.delete(action),
            await tx.delete(trigger),
            await tx.delete(zap),
            await tx.delete(availableActions),
            await tx.delete(availableTriggers),
            await tx.delete(user),

            // Seed Users
            console.log("Creating users...");
        const [user1, user2] = await tx.insert(user).values([
            {
                name: "izhar",
                email: "izhar@example.com",
                password: "hashed_password_1",
            },
            {
                name: "random",
                email: "random@example.com",
                password: "hashed_password_2",
            },
        ]).returning();

        // Seed Available Triggers and Actions
        console.log("Creating available triggers and actions...");
        const [webhookTrigger] = await tx.insert(availableTriggers).values([
            {
                name: "Webhook Trigger",
                image: "https://mailparser.io/wp-content/uploads/2018/08/what-is-a-webhook-1024x536.jpeg"
            },
        ]).returning();

        const [emailAction, solanaAction] = await tx.insert(availableActions).values([
            {
                name: "Send Email",
                image: "https://cdn.pixabay.com/photo/2016/06/13/17/30/mail-1454734_640.png"
            },
            {
                name: "Solana Transaction",
                image: "https://cdn.vectorstock.com/i/500p/04/45/solana-logo-coin-icon-isolated-vector-43670445.jpg"
            },
        ]).returning();

        // Seed a Zap with Trigger and Actions
        console.log("Creating zaps with triggers and actions...");
        const [newZap] = await tx.insert(zap).values([
            {
                userId: user1.id,
            },
        ]).returning();

        // Add Trigger to Zap
        const [newTrigger] = await tx.insert(trigger).values([
            {
                zapId: newZap.id,
                triggerId: webhookTrigger.id,
                metaData: {
                    webhookUrl: "https://api.example.com/webhook",
                    secret: "secure_secret_123",
                },
            },
        ]).returning();

        // Add Actions to Zap
        const [emailZapAction, solanaZapAction] = await tx.insert(action).values([
            {
                zapId: newZap.id,
                actionId: emailAction.id,
                metaData: {
                    recipient: "user@example.com",
                    subject: "New Zap Notification",
                    body: "Your zap has been triggered!",
                },
                sortingOrder: 1,
            },
            {
                zapId: newZap.id,
                actionId: solanaAction.id,
                metaData: {
                    recipientWallet: "SOL123...",
                    amount: "0.5",
                    token: "SOL",
                },
                sortingOrder: 2,
            },
        ]).returning();

        // Optionally add a ZapRun record
        console.log("Creating sample zap run...");
        const [newZapRun] = await tx.insert(zapRuns).values([
            {
                zapId: newZap.id,
                metaData: {
                    triggerTime: new Date().toISOString(),
                    status: "pending",
                },
            },
        ]).returning();

        await tx.insert(zapRunsOutbox).values([
            {
                zapRunId: newZapRun.id,
            },
        ]);
        console.log("Database seeded successfully!");

        console.log(`
            users: ${JSON.stringify([user1, user2])},
            triggers: ${JSON.stringify([webhookTrigger])},
            actions: ${JSON.stringify([emailAction, solanaAction])},
            zaps: ${JSON.stringify([newZap])},
            zapTriggers:- ${JSON.stringify(newTrigger)},
            zapActions: ${JSON.stringify([emailZapAction, solanaZapAction])},
            zapRuns: ${JSON.stringify([newZapRun])},    
            `);

        return {
            users: [user1, user2],
            triggers: [webhookTrigger],
            actions: [emailAction, solanaAction],
            zaps: [newZap],
            zapActions: [emailZapAction, solanaZapAction],
            zapRuns: [newZapRun],
        };
    })

}

seedDatabase()
    .then((result) => {
        console.log("Seed result:", result);
        process.exit(0);
    })
    .catch((error) => {
        console.error("Error seeding database:", error);
        process.exit(1);
    });