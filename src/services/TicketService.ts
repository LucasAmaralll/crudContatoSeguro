import { TicketRepository } from '../repositories/TicketRepository.js'
import { prisma } from '../lib/prisma.js'
import { CreateTicketDTO } from '../dtos/TicketDTOs.js'
import { i18n, Language } from '../config/i18n.js'
import { whatsappService } from './WhatsappService.js'

class TicketService {
  async createTicket(data: CreateTicketDTO) {
    const user = await prisma.user.findUnique({
      where: {
        id: data.userId,
      },
    })

    const lang = (user?.language as Language) || 'pt'

    if (!user) {
      throw new Error(i18n[lang].errors.userNotFound)
    }

    const content = `${data.title} ${data.description}`.toLowerCase()

    let channel:
      | 'OUVIDORIA'
      | 'SAC'
      | 'SUPORTE_TECNICO'
      | 'FINANCEIRO'
      | 'FORA_DO_ESCOPO'
      | 'PENDENTE_REVISAO' = 'PENDENTE_REVISAO'
    let priority: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW'

    if (
      content.includes('denuncia') ||
      content.includes('assédio') ||
      content.includes('fraude') ||
      content.includes('corrupção') ||
      content.includes('Ética')
    ) {
      channel = 'OUVIDORIA'
      priority = 'HIGH'
    } else if (
      content.includes('assinatura') ||
      content.includes('cancelamento') ||
      content.includes('entrega') ||
      content.includes('atendimento')
    ) {
      channel = 'SAC'
      priority = 'MEDIUM'
    } else if (
      content.includes('acesso') ||
      content.includes('bug') ||
      content.includes('falha') ||
      content.includes('instabilidade') ||
      content.includes('não funciona')
    ) {
      channel = 'SUPORTE_TECNICO'
      priority = 'MEDIUM'
    } else if (
      content.includes('cobrança') ||
      content.includes('pagamento') ||
      content.includes('reembolso')
    ) {
      channel = 'FINANCEIRO'
      priority = 'MEDIUM'
    } else if (
      data.description.length < 10 ||
      content.includes('vago') ||
      content.includes('teste')
    ) {
      channel = 'FORA_DO_ESCOPO'
      priority = 'LOW'
    }

    const repository = new TicketRepository()

    const ticket = await repository.create({
      title: data.title,
      description: data.description,
      userId: data.userId,
      channel,
      priority,
    })

    // Envio de notificação via WhatsApp (Assíncrono)
    if (user.telephone) {
      const message = whatsappService.formatMessage(
        i18n[lang].notifications.ticketCreated,
        { id: ticket.id, title: ticket.title }
      )
      whatsappService.sendMessage(user.telephone, message).catch(err => {
        console.error('Erro ao enviar notificação de criação:', err)
      })
    }

    return ticket
  }

  async listTickets() {
    const repository = new TicketRepository()

    return await repository.findAll()
  }

  async getTicketById(id: number) {
    const repository = new TicketRepository()

    const ticket = await repository.findById(id)

    if (!ticket) {
      // Como não temos o usuário aqui sem buscar antes, vamos usar PT por padrão ou buscar o usuário
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

    // Envio de notificação de mudança de status
    if (ticketExists.user?.telephone) {
      const lang = (ticketExists.user.language as Language) || 'pt'
      const message = whatsappService.formatMessage(
        i18n[lang].notifications.ticketStatusUpdated,
        { 
          id: updatedTicket.id, 
          title: updatedTicket.title,
          status: updatedTicket.status
        }
      )
      whatsappService.sendMessage(ticketExists.user.telephone, message).catch(err => {
        console.error('Erro ao enviar notificação de status:', err)
      })
    }

    return updatedTicket
  }
}

export { TicketService }
