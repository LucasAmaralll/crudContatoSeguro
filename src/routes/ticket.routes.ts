import { Router } from 'express'
import { TicketController } from '../controllers/TicketController.js'

const ticketRoutes = Router()

const ticketController = new TicketController()

ticketRoutes.post('/', ticketController.create)

ticketRoutes.get('/', ticketController.index)

ticketRoutes.get('/:id', ticketController.show)

ticketRoutes.put('/:id/status', ticketController.updateStatus)

export { ticketRoutes }
