import { Request, Response, Router } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { db } from "../db";
import { user } from "../db/schema";
import { and, eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export const jwtPassword = process.env.JWT_SECRET || "SecR3t";
const saltRounds = 10;
const router = Router();

// Schema Definitions
const userSchema = z.object({
    name: z.string(),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Must be 6 or more characters long" }),
});

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Must be 6 or more characters long" }),
});

// Routes
router.post("/signUp", async (req: Request, res: Response): Promise<any> => {
    const { email, password, name } = req.body;

    // Validate input
    const signUpResponse = userSchema.safeParse(req.body);
    if (!signUpResponse.success) {
        return res.status(400).json({
            message: "Validation failed",
            errors: signUpResponse.error.flatten()
        });
    }

    // Check if user exists
    const [existingUser] = await db.select()
        .from(user)
        .where(eq(user.email, email))
        .limit(1);

    if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
    }

    // Hash password and create user
    try {
        const hashPassword = await bcrypt.hash(password, saltRounds);
        await db.insert(user).values({
            email,
            name,
            password: hashPassword
        });

        return res.status(201).json({ message: "Successfully signed up" });
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

router.post("/login", async (req: Request, res: Response) : Promise<any> => {
    // Validate input
    const parsedLoginSchema = loginSchema.safeParse(req.body);
    if (!parsedLoginSchema.success) {
        return res.status(400).json({
            message: "Validation failed",
            errors: parsedLoginSchema.error.flatten()
        });
    }

    const { email, password } = parsedLoginSchema.data;

    try {
        // Find user
        const [userExist] = await db.select()
            .from(user)
            .where(eq(user.email, email))
            .limit(1);

        if (!userExist) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, userExist.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate token
        const token = jwt.sign({ email, userId: userExist.id }, jwtPassword);

        return res.json({
            token,
            user: {
                id: userExist.id,
                email: userExist.email,
                name: userExist.name
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

export const userRouter = router;