import { PrismaClient, Prisma } from "@prisma/client/edge";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    try {
        const allUsers = await prisma.users.findMany();
        return {
            status: "success",
            response: allUsers,
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
