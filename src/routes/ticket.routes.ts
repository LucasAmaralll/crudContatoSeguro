import { Router } from 'express'
import { TicketController } from '../controllers/TicketController.js'

const ticketRoutes = Router()

const ticketController = new TicketController()

/**
 * @swagger
 * /tickets:
 *   post:
 *     summary: Cria um novo ticket com triagem automática
 *     tags: [Tickets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description, userId]
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               userId: { type: integer }
 *     responses:
 *       201:
 *         description: Ticket criado e classificado
 */
ticketRoutes.post('/', ticketController.create)

/**
 * @swagger
 * /tickets:
 *   get:
 *     summary: Lista todos os tickets
 *     tags: [Tickets]
 *     responses:
 *       200:
 *         description: Lista de tickets
 */
ticketRoutes.get('/', ticketController.index)

/**
 * @swagger
 * /tickets/{id}:
 *   get:
 *     summary: Busca um ticket pelo ID
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados do ticket
 */
ticketRoutes.get('/:id', ticketController.show)

/**
 * @swagger
 * /tickets/{id}/status:
 *   put:
 *     summary: Atualiza o status de um ticket
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status: { type: string, enum: [OPEN, PENDING, CLOSED] }
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso
 */
ticketRoutes.put('/:id/status', ticketController.updateStatus)

export { ticketRoutes }
