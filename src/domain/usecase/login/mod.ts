import { Account, createAccount } from "../../../domain/model/login";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'secret';
const ISSUER = 'https://your-custom-auth.com';
const AUDIENCE = 'your-client-id';

export interface LoginRepository {
    get(email: string): Promise<Account | null>;
    post(account: Account): Promise<Account>;
}

export const RegisterUsecase = (repo: LoginRepository) => async (acocunt: Account) => {
    const exist = await repo.get(acocunt.email)
    if (exist) {
        throw new Error('invalid'); // TODO: エラーの移譲 RESTへ渡す
    }
    const account = await createAccount(acocunt.email, acocunt.password)
    const new_account = await repo.post(account)
}

export const LoginUsecase = (repo: LoginRepository) => async (input: {
    email: string, password: string
}) => {
    const account = await repo.get(input.email)
    if (!account) {
        throw new Error('invalid account'); // TODO: エラーの移譲 RESTへ渡す
    }

    console.log("account:", account.password)

    const match = await bcrypt.compare(input.password, account.password);
    if (!match) {
        throw new Error('invalid match'); // TODO: エラーの移譲 RESTへ渡す
    } // なんかうまくいかない



    const payload = {
        sub: account.id,
        email: account.email,
    };

    const token = jwt.sign(payload, JWT_SECRET, {
        algorithm: 'HS256',
        expiresIn: '5m',
        issuer: ISSUER,
        audience: AUDIENCE,
    });

    return token
}

