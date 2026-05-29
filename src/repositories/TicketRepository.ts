import { prisma } from '../lib/prisma.js'
import { CreateTicketRepositoryDTO } from '../dtos/TicketDTOs.js'

class TicketRepository {
  async create(data: CreateTicketRepositoryDTO) {
    return await prisma.ticket.create({
      data,
    })
  }

  async findAll() {
    return await prisma.ticket.findMany({
      include: {
        user: true,
      },
    })
  }

  async findById(id: number) {
    return await prisma.ticket.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    })
  }

  async updateStatus(id: number, status: 'OPEN' | 'PENDING' | 'CLOSED') {
    return await prisma.ticket.update({
      where: {
        id,
      },
      data: {
        status,
      },
    })
  }
}

export { TicketRepository }
