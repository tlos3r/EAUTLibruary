import { PrismaClient, Prisma } from "@prisma/client/edge";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { id, name } = body;
    try {
        const updateCategory = await prisma.category.update({
            where: { id: parseInt(id) },
            data: {
                name,
                updated_at: new Date().toISOString(),
            },
        });
        return {
            status: "success",
            response: updateCategory,
        };
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
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
