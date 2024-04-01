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
    try {
        const getCategories = await prisma.category.findMany({
            orderBy: {
                id: "asc",
            },
            where: filter,
        });
        return {
            status: "success",
            response: getCategories,
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
