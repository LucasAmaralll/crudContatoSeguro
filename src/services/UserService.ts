import { UserRepository } from '../repositories/UserRepository.js'
import { CreateUserDTO } from '../dtos/UserDTOs.js'
import { i18n, Language } from '../config/i18n.js'

class UserService {
  async createUser(data: CreateUserDTO) {
    const repository = new UserRepository()

    const userAlreadyExists = await repository.findAll()

    const emailExists = userAlreadyExists.find(
      (user) => user.email === data.email,
    )

    if (emailExists) {
      throw new Error('E-mail já cadastrado')
    }

    return await repository.create(data)
  }

  async listUsers() {
    const repository = new UserRepository()

    return await repository.findAll()
  }

  async getUserById(id: number) {
    const repository = new UserRepository()

    const user = await repository.findById(id)

    if (!user) {
      throw new Error(i18n.pt.errors.userNotFound)
    }

    return user
  }

  async updateUser(id: number, data: Partial<CreateUserDTO>) {
    const repository = new UserRepository()

    const userExists = await repository.findById(id)

    if (!userExists) {
      throw new Error(i18n.pt.errors.userNotFound)
    }

    return await repository.update(id, data)
  }

  async deleteUser(id: number) {
    const repository = new UserRepository()

    const userExists = await repository.findById(id)

    if (!userExists) {
      throw new Error(i18n.pt.errors.userNotFound)
    }

    return await repository.delete(id)
  }

  async updateLanguage(id: number, language: 'pt' | 'en') {
    const repository = new UserRepository()

    const userExists = await repository.findById(id)

    if (!userExists) {
      throw new Error(i18n.pt.errors.userNotFound)
    }

    return await repository.update(id, { language })
  }
}

export { UserService }
