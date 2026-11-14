import { http } from '../api/http'

const BASE = '/emprestimo'

export const emprestimoService = {
  listar: () => http.get(BASE).then((r) => r.data),

  // Espelha a entidade Emprestimo: relacionamentos enviados por id.
  criar: ({ equipamentoId, colaboradorId, dataEmprestimo, dataPrevistaDevolucao }) =>
  http
    .post(BASE, {
      equipamento_id: equipamentoId,
      colaborador_id: colaboradorId,
      dataEmprestimo,
      dataPrevistaDevolucao,
    })
    .then((r) => r.data),

  // Ajuste para o endpoint real de devolução do seu controller.
  registrarDevolucao: (id) => http.put(`${BASE}/${id}/devolucao`).then((r) => r.data),
}
