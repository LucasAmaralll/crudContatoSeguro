import request from 'supertest'
import { app } from '../src/app'
import { prisma } from '../src/lib/prisma'
import { jest } from '@jest/globals'

describe('Tickets API', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  describe('POST /tickets', () => {
    it('should create a ticket with automatic classification', async () => {
      const ticketData = {
        title: 'Sistema fora do ar',
        description: 'Temos uma instabilidade no servidor principal.',
        userId: 1
      };

      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue({ id: 1, language: 'pt' } as any);
      jest.spyOn(prisma.ticket, 'create').mockResolvedValue({
        id: 1,
        ...ticketData,
        channel: 'SUPORTE_TECNICO',
        priority: 'MEDIUM',
        status: 'OPEN',
        createdAt: new Date(),
        updatedAt: new Date()
      } as any)

      const response = await request(app)
        .post('/tickets')
        .send(ticketData)

      expect(response.status).toBe(201)
      expect(response.body.channel).toBe('SUPORTE_TECNICO')
      expect(response.body.priority).toBe('MEDIUM')
    })

    it('should classify as OUVIDORIA for high priority cases', async () => {
      const ticketData = {
        title: 'Denúncia urgente',
        description: 'Relato de fraude financeira.',
        userId: 1
      };

      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue({ id: 1, language: 'pt' } as any);
      jest.spyOn(prisma.ticket, 'create').mockResolvedValue({
        id: 1,
        ...ticketData,
        channel: 'OUVIDORIA',
        priority: 'HIGH',
        status: 'OPEN'
      } as any)

      const response = await request(app)
        .post('/tickets')
        .send(ticketData)

      expect(response.status).toBe(201)
      expect(response.body.channel).toBe('OUVIDORIA')
      expect(response.body.priority).toBe('HIGH')
    })
  })

  describe('PUT /tickets/:id/status', () => {
    it('should update ticket status', async () => {
      jest.spyOn(prisma.ticket, 'findUnique').mockResolvedValue({ id: 1, status: 'OPEN' } as any);
      jest.spyOn(prisma.ticket, 'update').mockResolvedValue({ id: 1, status: 'CLOSED' } as any)

      const response = await request(app)
        .put('/tickets/1/status')
        .send({ status: 'CLOSED' })

      expect(response.status).toBe(200)
      expect(response.body.status).toBe('CLOSED')
    })
  })
})
