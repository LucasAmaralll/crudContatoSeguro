import { TicketChannel, TicketPriority } from '@prisma/client'

export interface ClassificationResult {
  channel: TicketChannel
  priority: TicketPriority
  reasoning: string
}

class ClassificationService {
  /**
   * PROMPT DE CLASSIFICAÇÃO (Para uso em LLMs como GPT-4 / Claude / Gemini)
   * 
   * "Você é um especialista em triagem de tickets de suporte. 
   * Analise o título e a descrição do ticket e classifique-o nos seguintes canais:
   * - OUVIDORIA: Denúncias, assédio, fraude, corrupção, questões éticas. (Prioridade: HIGH)
   * - SAC: Assinatura, cancelamento, entrega, atendimento geral. (Prioridade: MEDIUM)
   * - SUPORTE_TECNICO: Bugs, falhas, instabilidades, acesso ao sistema. (Prioridade: MEDIUM)
   * - FINANCEIRO: Cobrança, pagamento, reembolso. (Prioridade: MEDIUM)
   * - FORA_DO_ESCOPO: Descrições muito curtas (< 10 caracteres), testes ou assuntos vagos. (Prioridade: LOW)
   * - PENDENTE_REVISAO: Quando não houver certeza.
   */

  async classifyTicket(title: string, description: string): Promise<ClassificationResult> {
    const content = `${title} ${description}`.toLowerCase()

    // Lógica Heurística (Simulando o comportamento do prompt acima)
    if (
      content.includes('denuncia') ||
      content.includes('assédio') ||
      content.includes('fraude') ||
      content.includes('corrupção') ||
      content.includes('ética')
    ) {
      return { 
        channel: 'OUVIDORIA', 
        priority: 'HIGH', 
        reasoning: 'Detectado termos sensíveis relacionados a ética ou compliance.' 
      }
    }

    if (
      content.includes('assinatura') ||
      content.includes('cancelamento') ||
      content.includes('entrega') ||
      content.includes('atendimento')
    ) {
      return { 
        channel: 'SAC', 
        priority: 'MEDIUM', 
        reasoning: 'Relacionado a serviços recorrentes ou atendimento ao cliente.' 
      }
    }

    if (
      content.includes('acesso') ||
      content.includes('acessar') ||
      content.includes('bug') ||
      content.includes('erro') ||
      content.includes('falha') ||
      content.includes('instabilidade') ||
      content.includes('não funciona')
    ) {
      return { 
        channel: 'SUPORTE_TECNICO', 
        priority: 'MEDIUM', 
        reasoning: 'Relacionado a problemas técnicos ou bugs no sistema.' 
      }
    }

    if (
      content.includes('cobrança') ||
      content.includes('pagamento') ||
      content.includes('reembolso')
    ) {
      return { 
        channel: 'FINANCEIRO', 
        priority: 'MEDIUM', 
        reasoning: 'Relacionado a transações financeiras ou faturamento.' 
      }
    }

    if (description.length < 10 || content.includes('vago') || content.includes('teste')) {
      return { 
        channel: 'FORA_DO_ESCOPO', 
        priority: 'LOW', 
        reasoning: 'Conteúdo insuficiente ou identificado como teste.' 
      }
    }

    return { 
      channel: 'PENDENTE_REVISAO', 
      priority: 'LOW', 
      reasoning: 'Não foi possível classificar automaticamente.' 
    }
  }
}

export const classificationService = new ClassificationService()
