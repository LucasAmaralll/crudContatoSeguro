import { Router } from 'express'
import { UserController } from '../controllers/UserController.js'

const userRoutes = Router()

const userController = new UserController()

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, telephone, language]
 *             properties:
 *               name: { type: string }
 *               email: { type: string }
 *               telephone: { type: string }
 *               language: { type: string }
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */
userRoutes.post('/', userController.create)

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
userRoutes.get('/', userController.index)

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Busca um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados do usuário
 *       404:
 *         description: Usuário não encontrado
 */
userRoutes.get('/:id', userController.show)

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza os dados de um usuário
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               telephone: { type: string }
 *     responses:
 *       200:
 *         description: Usuário atualizado
 */
userRoutes.put('/:id', userController.update)

/**
 * @swagger
 * /users/{id}/language:
 *   patch:
 *     summary: Atualiza o idioma de preferência do usuário
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [language]
 *             properties:
 *               language: { type: string, example: pt }
 *     responses:
 *       200:
 *         description: Idioma atualizado
 */
userRoutes.patch('/:id/language', userController.updateLanguage)

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Exclui um usuário
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Usuário excluído com sucesso
 */
userRoutes.delete('/:id', userController.delete)

export { userRoutes }
