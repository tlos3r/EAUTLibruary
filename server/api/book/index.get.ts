import { PrismaClient, Prisma } from "@prisma/client/edge";

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    let filter = {};

    if (query.id) {
        Object.assign(filter, {
            id: parseInt(query.id as string),
        });
    }
    if (query.name) {
        Object.assign(filter, {
            name: {
                contains: query.name,
            },
        });
    }
    if (query.gte) {
        Object.assign(filter, {
            created_at: {
                gte: (query.gte as string).replace(/"/, "").slice(0, -1),
            },
        });
    }
    if (query.lte) {
        // @ts-ignore
        Object.assign(filter.created_at, {
            lte: (query.lte as string).replace(/"/, "").slice(0, -1),
        });
    }
    try {
        const allBooks = await prisma.book.findMany({
            where: filter,
            orderBy: {
                id: "asc",
            },
            include: {
                Category: true,
                _count: {
                    select: {
                        Borrows: true,
                    },
                },
            },
        });
        return {
            status: "success",
            response: allBooks,
        };
    } catch (error) {
        if (error instanceof Prisma.PrismaClientUnknownRequestError) {
            return {
                status: "error",
                error: "Lỗi Prisma : " + error.message,
            };
        }
        return {
            status: "error",
            error,
        };
    }
});
