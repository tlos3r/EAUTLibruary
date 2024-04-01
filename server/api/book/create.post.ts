import { PrismaClient, Prisma } from "@prisma/client/edge";
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { name, author, quantity, image, category } = body;
    try {
        const newBook = await new PrismaClient().book.create({
            data: {
                name,
                author,
                quantity,
                image,
                Category: {
                    connect: { id: category },
                },
            },
        });
        return {
            status: "success",
            response: newBook,
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
