import { generateKeyPairSync } from 'crypto';
import { Key } from '../../model/key';


export interface KeyRepository {
    post(key: Key): Promise<void>
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
