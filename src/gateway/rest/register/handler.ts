import { RegisterUsecase } from "../../../domain/usecase/login/mod";
import { loginRepositoryPrisma } from "../../rdb/login/mod";


const register = RegisterUsecase(loginRepositoryPrisma)

export const RegisterHandler = {
    post: async (req: any, res: any) => {
        console.log(req.body)
        try {
            const user = await register(req.body);
            res.status(204).json(user);
        } catch (e: any) {
            res.status(400).json({ error: e.message });
        }
    },
}
