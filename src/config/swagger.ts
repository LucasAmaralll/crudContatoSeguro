import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Triagem de Atendimentos - Contato Seguro',
      version: '1.0.0',
      description: 'API para gerenciamento de usuários e triagem automática de tickets de suporte.',
    },
    servers: [
      {
        url: 'http://localhost:3333',
        description: 'Servidor Local',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            email: { type: 'string' },
            telephone: { type: 'string' },
            language: { type: 'string' },
          },
        },
        Ticket: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            title: { type: 'string' },
            description: { type: 'string' },
            status: { type: 'string', enum: ['OPEN', 'PENDING', 'CLOSED'] },
            channel: { type: 'string', enum: ['OUVIDORIA', 'SAC', 'SUPORTE_TECNICO', 'FINANCEIRO', 'FORA_DO_ESCOPO', 'PENDENTE_REVISAO'] },
            priority: { type: 'string', enum: ['HIGH', 'MEDIUM', 'LOW'] },
            userId: { type: 'integer' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'], // Caminho para onde estão as rotas para ler os comentários JSDoc
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('📄 Swagger docs available at http://localhost:3333/docs');
}
