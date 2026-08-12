import { Hono } from "hono";
import { sign } from "hono/jwt";
import { authMiddleware } from "../Middleware/auth";
import { createPrisma } from "../lib/prisma";
import type { Bindings } from "../types";
import { signinInputs, SigninInputs, SignupInputs, signupInputs } from "@tejakumar07/scriptorio";

export const userRouter = new Hono<{Bindings: Bindings}>();

userRouter.post("/signup", async (c) => {
    try {
        const prisma = createPrisma(c.env.DATABASE_URL);
        
        const inputs = await c.req.json<SignupInputs>();

        const { success } = signupInputs.safeParse(inputs)


        if (!success) {
            return c.json({
                message: `Check your Inputs`
            })
        }

        const response = await prisma.user.findUnique({
            where: {
                email: inputs.email
            }
        })


        if (response) {
            return c.json({
                message: `User already exists Please Login`
            })
        }

        const user = await prisma.user.create({
            data: {
                email: inputs.email,
                password: inputs.password
            },
            select: {
                id: true,
                email: true
            }
        })

        const jwtSectet = c.env.JWT_SECRET;

        if (!jwtSectet) {
            return c.json({
                message: `Please Provide JWT_SECRET`
            })
        }

        const token = `Bearer ` + await sign({sub: user.id}, jwtSectet, "HS256");

        if (!token) {
            return c.json({
                message: `Unable to generate Token now Please try again later`
            })
        }

        return c.json({
            message: `Login Successfully`,
            token: token
        })

    }
    catch(e) {
        return c.json({
            message: `Something went wrong ${e}`
        })
    }
})

userRouter.post("/login", async (c) => {
    try {
        
        const prisma = createPrisma(c.env.DATABASE_URL);

        const inputs = await c.req.json<SigninInputs>();

        const { success } = signinInputs.safeParse(inputs);

        if (!success) {
            return c.json({
                message: `Check your Inputs`
            }, 400)
        }

        const user = await prisma.user.findUnique({
            where: {
                email: inputs.email,
                password: inputs.password
            },
            select: {
                id: true,
                email: true,
                password: true
            }
        })

        if (!user) {
            return c.json({
                message: `User Does not exist, Please Signup`
            })
        }

        const jwtSecret = c.env.JWT_SECRET;

        if (!jwtSecret) {
            return c.json({
                message: `Please Provide JWT_SECRET`
            })
        }

        const token = `Bearer ` + await sign({sub: user.id}, jwtSecret)

        if (!token) {
            return c.json({
                message: `Unable to generate Token`
            })
        }

        return c.json({
            message: `Login Successfully`,
            token: token
        })

        // End of Try Block
    }
    catch(e) {
        return c.json({
            message: `Something went wrong ${e}`
        })
    }
})

userRouter.get("/me", authMiddleware, async (c) => {
    try {
        const userId = c.get("userId");

        const prisma = createPrisma(c.env.DATABASE_URL);

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                email: true
            }
        })
        
        if (!user) {
            return c.json({
                message: `User not Found`
            })
        }

        return c.json({
            message: user
        })
        // End of Try Block
    }
    catch(e) {
        return c.json({
            message: `Something went wrong ${e}`
        })
    }
})