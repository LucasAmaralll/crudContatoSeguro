export interface CreateTicketDTO {
  title: string
  description: string
  userId: number
}

export interface CreateTicketRepositoryDTO {
  title: string
  description: string
  channel:
    | 'OUVIDORIA'
    | 'SAC'
    | 'SUPORTE_TECNICO'
    | 'FINANCEIRO'
    | 'FORA_DO_ESCOPO'
    | 'PENDENTE_REVISAO'
  priority: 'LOW' | 'MEDIUM' | 'HIGH'
  userId: number
}
