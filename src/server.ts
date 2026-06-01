import { app } from './app.js'

const port = process.env.PORT ? Number(process.env.PORT) : 3333

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`)
})
