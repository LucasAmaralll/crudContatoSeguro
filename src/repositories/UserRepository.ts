import { prisma } from '../lib/prisma.js'
import { CreateUserDTO } from '../dtos/UserDTOs.js'

class UserRepository {
  async create(data: CreateUserDTO) {
    return await prisma.user.create({
      data,
    })
  }

  async findAll() {
    return await prisma.user.findMany()
  }

  async findById(id: number) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    })
  }

  async update(id: number, data: Partial<CreateUserDTO>) {
    return await prisma.user.update({
      where: {
        id,
      },
      data,
    })
  }

  async delete(id: number) {
    return await prisma.user.delete({
      where: {
        id,
      },
    })
  }
}

export { UserRepository }
