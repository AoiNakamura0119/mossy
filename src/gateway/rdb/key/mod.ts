
import { JwtKey, Key } from "../../../domain/model/key";
import { KeyRepository } from "../../../domain/usecase/key/mod";
import { redis } from "../../../lib/redis";


export const keyRepositoryRedis: KeyRepository = {
    async get(): Promise<JwtKey> {
        const kid = await redis.get('jwt:kid:current');
        if (!kid) {
            throw Error('No active signing key')
        }
        const privateKey = await redis.get(`jwt:private:${kid}`);
        if (!privateKey) {
            throw Error('No active privateKey')
        }
        return {
            kid, privateKey
        }
    },
    async post(key: Key): Promise<void> {
        await redis.set(`jwt:private:${key.kid}`, key.privateKey);
        await redis.set(`jwt:public:${key.kid}`, key.publicKey);
        await redis.set('jwt:kid:current', key.kid);
    },
    async get_pub_key(): Promise<string> {
        const kid = await redis.get('jwt:kid:current');
        if (!kid) {
            throw Error('No active signing key')
        }
        const publickKey = await redis.get(`jwt:public:${kid}`);
        if (!publickKey) {
            throw Error('No active privateKey')
        }
        return publickKey
    }
}
