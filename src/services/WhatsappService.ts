import { Language } from '../config/i18n.js'

class WhatsappService {
  /**
   * Envia uma mensagem de WhatsApp.
   * Por enquanto esta é uma implementação simulada (mock).
   * Você pode integrar com Twilio, Webhook do Meta ou Evolution API aqui.
   */
  async sendMessage(to: string, message: string) {
    if (!to) return

    // Remove caracteres não numéricos. Ex: (11) 99999-9999 -> 11999999999
    const phoneNumber = to.replace(/\D/g, '')

    console.log(`[Whatsapp] Destinatário: ${phoneNumber}`)
    console.log(`[Whatsapp] Mensagem: ${message}`)

    /**
     * INTEGRAÇÃO SIMPLES (EX: EVOLUTION API / WEBHOOKS)
     * Para que as mensagens cheguem de verdade:
     * 1. Rode uma instância da Evolution API (Docker)
     * 2. Conecte seu WhatsApp via QR Code
     * 3. Descomente o código abaixo e configure a URL e o API_KEY
     */

    /*
    try {
      await fetch('URL_DA_SUA_API/message/sendText/NOME_DA_INSTANCIA', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'SUA_API_KEY_AQUI'
        },
        body: JSON.stringify({
          number: phoneNumber,
          text: message
        })
      })
    } catch (error) {
      console.error('Erro ao conectar com API de WhatsApp:', error)
    }
    */
  }

  formatMessage(template: string, params: Record<string, string | number>) {
    let formatted = template
    for (const [key, value] of Object.entries(params)) {
      formatted = formatted.replace(`$[${key}]`, String(value))
    }
    return formatted
  }
}

export const whatsappService = new WhatsappService()
