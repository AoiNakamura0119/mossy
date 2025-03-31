import { KeyUsecase } from "../../../domain/usecase/key/mod";
import { keyRepositoryRedis } from "../../rdb/key/mod";


const keys = KeyUsecase(keyRepositoryRedis);

export const KeysHandler = {
    post: async (req: any, res: any) => {
        console.log(req.body)
        try {
            await keys(req.body)
            res.status(201).json()
        } catch (e: any) {
            res.status(400).json({ error: e.message });
        }
    }
}
