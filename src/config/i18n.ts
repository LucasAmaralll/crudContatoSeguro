export const i18n = {
  pt: {
    errors: {
      userNotFound: 'Usuário não encontrado',
      ticketNotFound: 'Ticket não encontrado',
      internalError: 'Erro interno do servidor',
      invalidLanguage: 'Idioma inválido. Use "pt" ou "en".',
    },
    success: {
      languageUpdated: 'Idioma de preferência atualizado com sucesso',
    },
    notifications: {
      ticketCreated: 'Seu ticket #$[id] "$[title]" foi aberto com sucesso!',
      ticketStatusUpdated: 'O status do seu ticket #$[id] "$[title]" foi alterado para: $[status]',
    },
  },
  en: {
    errors: {
      userNotFound: 'User not found',
      ticketNotFound: 'Ticket not found',
      internalError: 'Internal server error',
      invalidLanguage: 'Invalid language. Use "pt" or "en".',
    },
    success: {
      languageUpdated: 'Preferred language updated successfully',
    },
    notifications: {
      ticketCreated: 'Your ticket #$[id] "$[title]" has been opened successfully!',
      ticketStatusUpdated: 'The status of your ticket #$[id] "$[title]" has been changed to: $[status]',
    },
  },
}

export type Language = keyof typeof i18n
export type MessageKey =
  | keyof typeof i18n.pt.errors
  | keyof typeof i18n.pt.success
