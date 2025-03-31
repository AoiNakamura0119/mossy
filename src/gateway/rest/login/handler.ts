import { LoginUsecase } from "../../../domain/usecase/login/mod";
import { loginRepositoryPrisma } from "../../rdb/login/mod";

const login = LoginUsecase(loginRepositoryPrisma);

export const LoginHandler = {
    post: async (req: any, res: any) => {
        console.log(req.body)
        try {
            const jwt = await login(req.body);
            res.status(201).json(jwt);
        } catch (e: any) {
            res.status(400).json({ error: e.message });
        }
    },
}
