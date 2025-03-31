import { generateKeyPairSync } from 'crypto';
import { JwtKey, Key } from '../../model/key';


export interface KeyRepository {
    get(): Promise<JwtKey>
    post(key: Key): Promise<void>
    get_pub_key(): Promise<string>
}

export const KeyUsecase = (repo: KeyRepository) => async (kid: string) => {
    try {
        const { publicKey, privateKey } = generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem'
            }
        });
        
        await repo.post({ kid, privateKey, publicKey})
    } catch (err) {
        console.error(err)
    }
}

export const PubKeyUsecase = (repo: KeyRepository) => async () => {
    try {
        const pub_key = await repo.get_pub_key()
        console.log("pub_key:", pub_key)
        return pub_key
    } catch (err) {
        console.error(err)
    }
}
