import { jest } from '@jest/globals'

// Mock do Logger para não sujar a saída dos testes
jest.mock('../src/lib/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  },
}))

// Mock do Prisma Client
const mockPrisma = {
  user: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  ticket: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
}

jest.mock('../src/lib/prisma', () => ({
  prisma: mockPrisma
}))

export { mockPrisma }
