import express from 'express'
import { LoginHandler } from './gateway/rest/login/handler'
import { RegisterHandler } from './gateway/rest/register/handler'



const app = express()
app.use(express.json())
const port = 6666


app.post('/login', LoginHandler.post)
app.post('/register', RegisterHandler.post)


app.listen(port, () => {
    console.log(`🚀 トークンベース認証サーバ起動中: http://localhost:${port}`)
})


