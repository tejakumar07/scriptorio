import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export function createPrisma(databaseUrl: string | undefined) {
    if (!databaseUrl) {
        throw new Error(
            "DATABASE_URL is not set. Add your Prisma Accelerate URL (prisma://...) as a Worker secret: wrangler secret put DATABASE_URL"
        );
    }

    return new PrismaClient({
        accelerateUrl: databaseUrl,
    }).$extends(withAccelerate());
}
