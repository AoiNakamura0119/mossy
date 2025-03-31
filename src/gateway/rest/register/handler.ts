import { RegisterUsecase } from "../../../domain/usecase/login/mod";
import { loginRepositoryPrisma } from "../../rdb/login/mod";


const register = RegisterUsecase(loginRepositoryPrisma)

export const RegisterHandler = {
    post: async (req: any, res: any) => {
        console.log(req.body)
        try {
            const user = await register(req.body);
            console.log("user:", user)
            res.status(200).json(user);
        } catch (e: any) {
            console.log("errorrrorrrororororrr")
            res.status(400).json({ error: e.message });
        }
    },
}
