import { LoginUsecase } from "../../../domain/usecase/login/mod";
import { keyRepositoryRedis } from "../../rdb/key/mod";
import { loginRepositoryPrisma } from "../../rdb/login/mod";

const login = LoginUsecase(loginRepositoryPrisma, keyRepositoryRedis);

export const LoginHandler = {
    post: async (req: any, res: any) => {
        console.log(req.body)
        try {
            console.log("認証サーバアクセス!")
            const jwt = await login(req.body);
            res.status(201).json(jwt);
        } catch (e: any) {
            res.status(400).json({ error: e.message });
        }
    },
}
