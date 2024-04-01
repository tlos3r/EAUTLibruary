import { Prisma, PrismaClient } from "@prisma/client/edge";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { id, returnDate } = body;
    try {
        const updateReturnDate = await prisma.borrows.update({
            where: {
                id,
            },
            data: {
                returnDate,
                books: {
                    update: {
                        borrowCount: {
                            increment: 1,
                        },
                    },
                },
                users: {
                    update: {
                        borrowCount: {
                            increment: 1,
                        },
                    },
                },
            },
        });
        return {
            status: "success",
            response: updateReturnDate,
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
