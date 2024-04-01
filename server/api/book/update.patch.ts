import { PrismaClient, Prisma } from "@prisma/client/edge";
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { id, name, author, quantity, image } = body;
    try {
        const updateBook = await new PrismaClient().book.update({
            where: { id: parseInt(id) },
            data: {
                name,
                author,
                quantity,
                image,
                updated_at: new Date().toISOString(),
            },
        });
        return {
            status: "success",
            response: updateBook,
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
