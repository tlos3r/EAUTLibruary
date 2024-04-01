import { PrismaClient, Prisma } from "@prisma/client/edge";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);

    try {
        const removeCategory = await new PrismaClient().category.delete({
            where: {
                id: parseInt(query.id as string),
            },
        });
        return {
            status: "success",
            response: removeCategory,
        };
    } catch (error) {
        if (error instanceof Prisma.PrismaClientValidationError) {
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
