import { Request, Response } from 'express'
import { UserService } from '../services/UserService.js'

class UserController {
  async create(req: Request, res: Response) {
    try {
      const { name, email, telephone } = req.body

      const service = new UserService()

      const user = await service.createUser({
        name,
        email,
        telephone,
      })

      return res.status(201).json(user)
    } catch (error) {
      return res.status(400).json({
        error: error instanceof Error ? error.message : 'Internal error',
      })
    }
  }

  async index(req: Request, res: Response) {
    const service = new UserService()

    const users = await service.listUsers()

    return res.json(users)
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params

      const service = new UserService()

      const user = await service.getUserById(Number(id))

      return res.json(user)
    } catch (error) {
      return res.status(404).json({
        error: error instanceof Error ? error.message : 'Internal error',
      })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params

      const { name, email, telephone } = req.body

      const service = new UserService()

      const user = await service.updateUser(Number(id), {
        name,
        email,
        telephone,
      })

      return res.json(user)
    } catch (error) {
      return res.status(400).json({
        error: error instanceof Error ? error.message : 'Internal error',
      })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params

      const service = new UserService()

      await service.deleteUser(Number(id))

      return res.status(204).send()
    } catch (error) {
      return res.status(400).json({
        error: error instanceof Error ? error.message : 'Internal error',
      })
    }
  }

  async updateLanguage(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { language } = req.body

      if (language !== 'pt' && language !== 'en') {
        return res.status(400).json({ error: 'Invalid language' })
      }

      const service = new UserService()

      const user = await service.updateLanguage(Number(id), language)

      return res.json(user)
    } catch (error) {
      return res.status(400).json({
        error: error instanceof Error ? error.message : 'Internal error',
      })
    }
  }
}

export { UserController }
