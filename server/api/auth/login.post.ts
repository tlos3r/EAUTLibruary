import { Prisma, PrismaClient } from "@prisma/client/edge";

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { email, password } = body;
    try {
        const user = await prisma.users.findFirstOrThrow({
            where: {
                email,
                password,
            },
        });
        return {
            status: "success",
            response: user,
        };
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return {
                status: "error",
                error: `${error.message}`,
            };
        }
        return {
            status: "error",
            error: `${error}`,
        };
    }
});
