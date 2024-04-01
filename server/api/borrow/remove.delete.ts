import { PrismaClient, Prisma } from "@prisma/client/edge";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    try {
        const removeBorrow = await new PrismaClient().borrows.deleteMany({
            where: {
                id: {
                    in: body.id,
                },
            },
        });
        return {
            status: "success",
            response: removeBorrow,
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
