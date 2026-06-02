# API de Triagem de Atendimentos - Contato Seguro

Este projeto é uma API Back-end para triagem automática de tickets de suporte, permitindo o cadastro de usuários, criação de tickets com classificação automática por canal e prioridade, além do gerenciamento de status.

## 🚀 Tecnologias Utilizadas

- **Node.js** (v20+)
- **TypeScript**
- **Express** (Framework Web)
- **Prisma** (ORM)
- **PostgreSQL** (Banco de Dados)
- **Jest & Supertest** (Testes Automatizados)
- **Pino** (Logs Estruturados)
- **Docker & Docker Compose** (Containerização)

## 📋 Funcionalidades

- **CRUD de Usuários**: Cadastro, listagem, consulta por ID, atualização e exclusão.
- **Triagem de Tickets**:
  - Classificação automática via motor de regras heurísticas nos canais: `OUVIDORIA`, `SAC`, `SUPORTE_TECNICO`, `FINANCEIRO`.
  - Identificação de casos `FORA_DO_ESCOPO`.
  - Marcação de `PENDENTE_REVISAO` para casos ambíguos.
  - Definição de prioridade inicial (`HIGH`, `MEDIUM`, `LOW`).
  - Preparado para integração com LLMs (Prompt documentado no código).
- **Gestão de Status**: Atualização de status do ticket (`OPEN`, `PENDING`, `CLOSED`).
- **Logs**: Monitoramento de operações críticas via logs estruturados.
- **I18n**: Suporte básico a diferentes idiomas (pt, en) nos retornos de erro.
- **Documentação**: Interface interativa via Swagger.

## 🛠️ Como Executar o Projeto

### Pré-requisitos
- Docker e Docker Compose instalados.
- Ou Node.js e PostgreSQL instalados localmente.

### Rodando com Docker (Recomendado)

1. Clone o repositório.
2. Na raiz do projeto, use os comandos facilitadores:
   - **Subir o ambiente:** `npm run up`
   - **Parar o ambiente:** `npm run down`
   - **Ver logs em tempo real:** `npm run logs`
   - **Rodar migrações manualmente:** `npm run migrate`
3. A API estará disponível em `http://localhost:3333`.
4. Acesse a documentação interativa em `http://localhost:3333/docs`.

### Rodando Localmente

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Configure o arquivo `.env` com a sua URL de conexão do PostgreSQL (Exemplo no `.env.example`).
3. Execute as migrations do Prisma:
   ```bash
   npx prisma migrate dev
   ```
4. Inicie o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```
5. Acesse a documentação interativa em `http://localhost:3333/docs`.

## 🧪 Como Executar os Testes

Os testes cobrem o CRUD de usuários, a criação de tickets e a lógica de classificação.

Para rodar os testes:
```bash
npm test
```

## 📂 Estrutura do Projeto

A API segue uma estrutura em camadas para melhor manutenibilidade:

- `src/controllers`: Lógica de entrada/saída (HTTP).
- `src/services`: Regras de negócio e casos de uso.
- `src/repositories`: Abstração de acesso a dados (Prisma).
- `src/dtos`: Objetos de transferência de dados.
- `src/config`: Configurações globais (i18n).
- `src/lib`: Bibliotecas compartilhadas (Prisma Client, Logger).

## 📡 Como Testar (API)

A forma mais fácil de testar é usando a extensão **REST Client** do VS Code com o arquivo:
👉 [docs/api.http](docs/api.http)

Lá você encontrará exemplos organizados por setor:
- **Fluxo de Usuário:** Criação, busca, edição e exclusão.
- **Fluxo de Tickets:** Exemplos específicos para triagem de Tecnologia e Ouvidoria.

---

### Exemplo de Requisição (Criar Ticket)
`POST /tickets`
```json
{
  "title": "Erro ao acessar o sistema",
  "description": "Não consigo fazer login, aparece erro 500.",
  "userId": 1
}
```

```

## 🏁 Health Check
`GET /health` - Verifica se a API está online.
