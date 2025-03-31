import bcrypt from 'bcrypt'

export type Account = {
    id: string,
    email: string;
    password: string;
};

export const createAccount = async (email: string, rawPassword: string): Promise<Account> => {
    if (!email.includes('@')) throw new Error('メールアドレスが無効');
    

    return {
        id: crypto.randomUUID(),
        email,
        password: rawPassword
    }
} 
