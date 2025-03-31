import { Account } from "@prisma/client";
import { LoginRepository } from "../../../domain/usecase/login/mod";
import prisma from "../../../lib/prisma";
import bcrypt from 'bcrypt';

export const loginRepositoryPrisma: LoginRepository = {
    async get(email: string): Promise<Account | null> {
        return await prisma.account.findUnique({ where: { email } })
    },
    async post(account: Account): Promise<Account> {
        const exist = await prisma.account.findUnique({ where: { email: account.email } })

        if (exist) {
            throw new Error('invalid'); // TODO: エラーの移譲 RESTへ渡す
        }
        const passwordHash = await bcrypt.hash(account.password, 10);
        console.log("passwordHash:", passwordHash)
        const newAccount = await prisma.account.create({
            data: {
                id: account.id,
                email: account.email,
                password: passwordHash,
            },
        });

        return newAccount
          
    } 
}
