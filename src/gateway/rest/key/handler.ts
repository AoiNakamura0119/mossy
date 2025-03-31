import { KeyUsecase, PubKeyUsecase } from "../../../domain/usecase/key/mod";
import { keyRepositoryRedis } from "../../rdb/key/mod";


const keys = KeyUsecase(keyRepositoryRedis);
const pubKeys = PubKeyUsecase(keyRepositoryRedis)

export const KeysHandler = {
    post: async (req: any, res: any) => {
        console.log(req.body)
        try {
            await keys(req.body)
            res.status(201).json()
        } catch (e: any) {
            res.status(400).json({ error: e.message });
        }
    },
    get: async (req: any, res: any) => {
        console.log(req.body)
        try {
            const pub_key = await pubKeys()
            console.log("pub_key:", pub_key)
            res.status(200).json({pub_key})
        } catch (e: any) {
            res.status(400).json({ error: e.message });
        }
    }
}
