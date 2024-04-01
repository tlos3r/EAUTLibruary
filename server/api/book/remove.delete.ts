import { PrismaClient, Prisma } from "@prisma/client/edge";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    try {
        const removeBook = await new PrismaClient().book.deleteMany({
            where: {
                id: {
                    in: body.id,
                },
            },
        });
        return {
            status: "success",
            response: removeBook,
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
