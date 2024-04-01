import { PrismaClient, Prisma } from "@prisma/client/edge";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { name } = body;
    try {
        const newCategory = await prisma.category.create({
            data: {
                name,
            },
        });
        return {
            status: "success",
            response: newCategory,
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
