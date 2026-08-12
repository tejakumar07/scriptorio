import { Context, Next } from "hono";
import { verify } from "hono/jwt";
import type { Bindings } from "../types";

type Variables = {
    userId: string
}


export const authMiddleware = async (
    c: Context<{Bindings: Bindings; Variables: Variables}>,
    next: Next
) => {
    try {
        const authHeader = c.req.header("Authorization");

        if (!authHeader) {
            return c.json({
                message: `You were not allowed`
            }, 401)
        }

        const [schema, token] = authHeader.split(" ");

        if (schema !== "Bearer" || !token) {
            return c.json({
                message: `Please Provide valid token`
            })
        }

        const payload = await verify(token, c.env.JWT_SECRET, "HS256");

        if (!payload.sub || typeof payload.sub !== "string") {
            return c.json({
                message: `Invalid Token`
            })
        }

        c.set('userId', payload.sub)

        await next();
    }
    catch(e) {
        return c.json({
            message: `Something went wrong ${e}`
        })
    }
}