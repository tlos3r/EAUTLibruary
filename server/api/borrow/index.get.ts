import { Prisma, PrismaClient } from "@prisma/client/edge";
export default defineEventHandler(async (event) => {
    let filter = {};
    const query = getQuery(event);
    try {
        const allBorrow = await new PrismaClient().borrows.findMany({
            include: {
                books: true,
                users: true,
            },
            where: {
                usersId: parseInt(query.id as string),
            },
        });

        return {
            status: "success",
            response: allBorrow,
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
