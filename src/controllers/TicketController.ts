import { Request, Response } from 'express'
import { TicketService } from '../services/TicketService.js'

class TicketController {
  async create(req: Request, res: Response) {
    try {
      const { title, description, userId } = req.body

      const service = new TicketService()

      const ticket = await service.createTicket({
        title,
        description,
        userId,
      })

      return res.status(201).json(ticket)
    } catch (error) {
      return res.status(400).json({
        error: error instanceof Error ? error.message : 'Internal error',
      })
    }
  }

  async index(req: Request, res: Response) {
    const service = new TicketService()

    const tickets = await service.listTickets()

    return res.json(tickets)
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params

      const service = new TicketService()

      const ticket = await service.getTicketById(Number(id))

      return res.json(ticket)
    } catch (error) {
      return res.status(404).json({
        error: error instanceof Error ? error.message : 'Internal error',
      })
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { status } = req.body

      const service = new TicketService()

      const ticket = await service.updateTicketStatus(Number(id), status)

      return res.json(ticket)
    } catch (error) {
      return res.status(400).json({
        error: error instanceof Error ? error.message : 'Internal error',
      })
    }
  }
}

export { TicketController }
