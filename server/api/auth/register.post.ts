import { PrismaClient, Prisma } from "@prisma/client/edge";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { email, role, name, password } = body;

    try {
        const newUser = await prisma.users.create({
            data: {
                email,
                role,
                name,
                password,
            },
        });
        return {
            status: "success",
            response: newUser,
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
            error: `${error}`,
        };
    }
});
