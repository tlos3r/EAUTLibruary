import { Prisma, PrismaClient } from "@prisma/client/edge";
export default defineEventHandler(async (event) => {
    let filter = {};
    const query = getQuery(event);
    if (query.id) {
        Object.assign(filter, {
            usersId: parseInt(query.id as string),
        });
    }
    try {
        const allBorrow = await new PrismaClient().borrows.findMany({
            include: {
                books: true,
                users: true,
            },
            where: filter,
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
