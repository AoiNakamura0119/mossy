import { Account, createAccount } from "../../../domain/model/login";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { KeyRepository } from "../key/mod";

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

export const LoginUsecase = (repo: LoginRepository, keyRepo: KeyRepository) => async (input: {
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

    try {
        const jwt_key = await keyRepo.get()
        const token = jwt.sign(payload, jwt_key.privateKey, {
            algorithm: 'RS256',
            expiresIn: '5m',
            issuer: 'https://auth.local',
            keyid: jwt_key.kid
          });
        return token
    } catch (err) {
        throw Error("error...")
    }
}

