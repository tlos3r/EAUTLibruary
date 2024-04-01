import { Prisma, PrismaClient } from "@prisma/client/edge";

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { bookId, usersId, borrowDate, dueDate } = body;
    try {
        const newBorrow = await prisma.borrows.create({
            data: {
                books: {
                    connect: {
                        id: bookId,
                    },
                },
                users: {
                    connect: {
                        id: usersId,
                    },
                },
                borrowDate,
                dueDate,
            },
        });
        return { status: "success", response: newBorrow };
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
