import { Hono } from "hono";
import { authMiddleware } from "../Middleware/auth";
import { createPrisma } from "../lib/prisma";
import type { Bindings } from "../types";

export const BlogRouter = new Hono<{ Bindings: Bindings }>();

BlogRouter.post("/create", authMiddleware, async (c) => {
    try {
        const prisma = createPrisma(c.env.DATABASE_URL);

        const input = await c.req.json()

        const userId = c.get("userId");

        const blog = await prisma.post.create({
            data: {
                title: input.title,
                description: input.description,
                userId
            }, select: {
                id: true,
                title: true,
                description: true
            }
        })

        if (!blog) {
            return c.json({
                message: `unable to create blog`
            })
        }

        return c.json({
            message: "Successfully Created Blog",
            metaData: blog
        }, 201);
        // End of Try
    }
    catch (e) {
        return c.json({
            message: `Something went wrong ${e}`
        })
    }
})


BlogRouter.get("/", async (c) => {
    try {
        const prisma = createPrisma(c.env.DATABASE_URL);

        const blogs = await prisma.post.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                userId: true
            },
            orderBy: {
                id: "desc"
            }
        });

        return c.json({
            metaData: blogs
        });

    } catch (e) {
        return c.json({
            message: "Something went wrong"
        }, 500);
    }
});

BlogRouter.get("/:id", async (c) => {
    try {
        const prisma = createPrisma(c.env.DATABASE_URL);

        const id = c.req.param("id");

        const blog = await prisma.post.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                title: true,
                description: true,
                userId: true
            }
        });

        if (!blog) {
            return c.json({
                message: "Blog not found"
            }, 404);
        }

        return c.json({
            metaData: blog
        });

    } catch (e) {
        return c.json({
            message: "Something went wrong"
        }, 500);
    }
});

BlogRouter.put("/:id", authMiddleware, async (c) => {
    try {
        const prisma = createPrisma(c.env.DATABASE_URL);

        const blogId = c.req.param("id");
        const userId = c.get("userId");

        const input = await c.req.json();

        const blog = await prisma.post.findUnique({
            where: {
                id: blogId
            }
        });

        if (!blog) {
            return c.json({
                message: "Blog not found"
            }, 404);
        }

        if (blog.userId !== userId) {
            return c.json({
                message: "You are not allowed to update this blog"
            }, 403);
        }

        const updatedBlog = await prisma.post.update({
            where: {
                id: blogId
            },
            data: {
                title: input.title,
                description: input.description
            }
        });

        return c.json({
            message: "Blog updated successfully",
            metaData: updatedBlog
        });

    } catch (e) {
        return c.json({
            message: "Something went wrong"
        }, 500);
    }
});

BlogRouter.delete("/:id", authMiddleware, async (c) => {
    try {
        const prisma = createPrisma(c.env.DATABASE_URL);

        const blogId = c.req.param("id");
        const userId = c.get("userId");

        const blog = await prisma.post.findUnique({
            where: {
                id: blogId
            }
        });

        if (!blog) {
            return c.json({
                message: "Blog not found"
            }, 404);
        }

        if (blog.userId !== userId) {
            return c.json({
                message: "You are not allowed to delete this blog"
            }, 403);
        }

        await prisma.post.delete({
            where: {
                id: blogId
            }
        });

        return c.json({
            message: "Blog deleted successfully"
        });

    } catch (e) {
        return c.json({
            message: "Something went wrong"
        }, 500);
    }
});