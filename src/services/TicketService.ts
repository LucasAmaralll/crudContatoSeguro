import { TicketRepository } from '../repositories/TicketRepository.js'
import { prisma } from '../lib/prisma.js'
import { CreateTicketDTO } from '../dtos/TicketDTOs.js'
import { i18n, Language } from '../config/i18n.js'
import { classificationService } from './ClassificationService.js'
import { logger } from '../lib/logger.js'

class TicketService {
  async createTicket(data: CreateTicketDTO) {
    logger.info({ userId: data.userId }, 'Iniciando criação de ticket')
    
    const user = await prisma.user.findUnique({
      where: {
        id: data.userId,
      },
    })

    const lang = (user?.language as Language) || 'pt'

    if (!user) {
      logger.warn({ userId: data.userId }, 'Tentativa de criar ticket para usuário inexistente')
      throw new Error(i18n[lang].errors.userNotFound)
    }

    // Classificação via IA (Serviço dedicado)
    const { channel, priority, reasoning } = await classificationService.classifyTicket(
      data.title,
      data.description
    )

    logger.info({ channel, priority, reasoning }, 'Ticket classificado automaticamente')

    const repository = new TicketRepository()

    const ticket = await repository.create({
      title: data.title,
      description: data.description,
      userId: data.userId,
      channel,
      priority,
    })

    return ticket
  }

  async listTickets() {
    return await new TicketRepository().findAll()
  }

  async getTicketById(id: number) {
    const ticket = await new TicketRepository().findById(id)

    if (!ticket) {
      throw new Error(i18n.pt.errors.ticketNotFound)
    }

    return ticket
  }

  async updateTicketStatus(id: number, status: 'OPEN' | 'PENDING' | 'CLOSED') {
    const repository = new TicketRepository()

    const ticketExists = await repository.findById(id)

    if (!ticketExists) {
      throw new Error(i18n.pt.errors.ticketNotFound)
    }

    const updatedTicket = await repository.updateStatus(id, status)
    
    logger.info({ ticketId: id, status }, 'Status do ticket atualizado')

    return updatedTicket
  }
}

export { TicketService }
