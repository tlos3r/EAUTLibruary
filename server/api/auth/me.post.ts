import { Prisma, PrismaClient } from "@prisma/client/edge";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    try {
        const getCurrentUser = await prisma.users.findFirstOrThrow({
            where: {
                email: body.email,
            },
        });

        return {
            status: "success",
            response: getCurrentUser,
        };
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return {
                status: "error",
                error: `Lỗi Prisma : ${error.message}`,
            };
        }
        return {
            status: "error",
            error,
        };
    }
});
