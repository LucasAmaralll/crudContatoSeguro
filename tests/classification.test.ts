import { classificationService } from '../src/services/ClassificationService'

describe('ClassificationService', () => {
  it('should classify as OUVIDORIA for ethics/misconduct terms', async () => {
    const result = await classificationService.classifyTicket(
      'Denúncia de assédio',
      'Sofri assédio no ambiente de trabalho.'
    )

    expect(result.channel).toBe('OUVIDORIA')
    expect(result.priority).toBe('HIGH')
  })

  it('should classify as SAC for subscription related terms', async () => {
    const result = await classificationService.classifyTicket(
      'Cancelamento de assinatura',
      'Gostaria de cancelar minha assinatura mensal.'
    )

    expect(result.channel).toBe('SAC')
    expect(result.priority).toBe('MEDIUM')
  })

  it('should classify as SUPORTE_TECNICO for technical issues', async () => {
    const result = await classificationService.classifyTicket(
      'Erro no sistema',
      'Não consigo acessar o dashboard, aparece erro 500.'
    )

    expect(result.channel).toBe('SUPORTE_TECNICO')
    expect(result.priority).toBe('MEDIUM')
  })

  it('should classify as FINANCEIRO for billing terms', async () => {
    const result = await classificationService.classifyTicket(
      'Problema no pagamento',
      'Minha cobrança está vindo em duplicidade.'
    )

    expect(result.channel).toBe('FINANCEIRO')
    expect(result.priority).toBe('MEDIUM')
  })

  it('should classify as FORA_DO_ESCOPO for short descriptions', async () => {
    const result = await classificationService.classifyTicket(
      'Teste',
      'apenas teste'
    )

    expect(result.channel).toBe('FORA_DO_ESCOPO')
    expect(result.priority).toBe('LOW')
  })

  it('should mark as PENDENTE_REVISAO if no match is found', async () => {
    const result = await classificationService.classifyTicket(
      'Assunto aleatório',
      'Batata doce com frango é muito bom para o treino.'
    )

    expect(result.channel).toBe('PENDENTE_REVISAO')
    expect(result.priority).toBe('LOW')
  })
})
