
import { Key } from "../../../domain/model/key";
import { KeyRepository } from "../../../domain/usecase/key/mod";
import { redis } from "../../../lib/redis";



export const keyRepositoryRedis: KeyRepository = {
    async post(key: Key): Promise<void> {
        await redis.set(`jwt:private:${key.kid}`, key.privateKey);
        await redis.set(`jwt:public:${key.kid}`, key.publicKey);
        await redis.set('jwt:kid:current', key.kid);
    }
}
