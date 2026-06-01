import request from 'supertest'
import { app } from '../src/app'
import { prisma } from '../src/lib/prisma'
import { jest } from '@jest/globals'

describe('User CRUD', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        telephone: '123456789'
      };

      jest.spyOn(prisma.user, 'findMany').mockResolvedValue([]);
      jest.spyOn(prisma.user, 'create').mockResolvedValue({
        id: 1,
        ...userData,
        language: 'pt',
        createdAt: new Date(),
        lastUpdated: new Date()
      } as any)

      const response = await request(app)
        .post('/users')
        .send(userData)

      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('id')
      expect(response.body.email).toBe(userData.email)
    })

    it('should return 400 if email already exists', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com'
      };

      jest.spyOn(prisma.user, 'findMany').mockResolvedValue([{ email: 'john@example.com' }] as any)

      const response = await request(app)
        .post('/users')
        .send(userData)

      expect(response.status).toBe(400)
      expect(response.body.error).toBe('E-mail já cadastrado')
    })
  })

  describe('GET /users', () => {
    it('should list all users', async () => {
      jest.spyOn(prisma.user, 'findMany').mockResolvedValue([
        { id: 1, name: 'User 1' },
        { id: 2, name: 'User 2' }
      ] as any)

      const response = await request(app).get('/users')

      expect(response.status).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
      expect(response.body.length).toBe(2)
    })
  })

  describe('GET /users/:id', () => {
    it('should return a user by id', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue({ id: 1, name: 'User 1' } as any)

      const response = await request(app).get('/users/1')

      expect(response.status).toBe(200)
      expect(response.body.id).toBe(1)
    })

    it('should return 404 if user not found', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null)

      const response = await request(app).get('/users/999')

      expect(response.status).toBe(404)
    })
  })
})
