export const serverError = {
  description: 'Erro no servidor interno',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
