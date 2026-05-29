export interface CreateUserDTO {
  name: string
  email: string
  telephone?: string
  language?: 'pt' | 'en'
}
