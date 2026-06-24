import { getTourAction } from "./tourActions"

const mountStep = (target: string, title: string, description: string) => {
  return {
    title,
    description,
    target: () => document.querySelector(`[data-tour=${target}]`) as HTMLElement,
    onStepChange: () => {
      const el = document.querySelector(`[data-tour=${target}]`) as HTMLElement
      getTourAction(el)?.()
    }
  }
}

export const stepsByPath: Record<string, ReturnType<typeof mountStep>[]> = {
  '/products': [
    mountStep(
      'adicionar_produto',
      'Cadastro de Produtos',
      'Cadastre produtos com nome, código, categoria, preço e quantidade mínima em estoque.'
    ),
    mountStep(
      'tabela_produtos',
      'Indicador de Estoque',
      'Cada produto tem um indicador visual — de verde (estoque abundante) a vermelho crítico, com alerta para produtos abaixo do mínimo configurado.'
    ),
    mountStep(
      'botao_estoque',
      'Movimentação de Estoque',
      'Registre entradas e saídas de estoque diretamente pela tabela, mantendo o controle atualizado em tempo real.'
    ),
  ],
  '/dashboard': [
    mountStep(
      'indicadores',
      'Indicadores Gerais',
      'Visão rápida do desempenho: total de pedidos, receita acumulada e ticket médio no período selecionado.'
    ),
    mountStep(
      'filtro_data',
      'Filtro por Período',
      'Filtre todos os dados por intervalo de datas. Os indicadores e gráficos atualizam em tempo real.'
    ),
    mountStep(
      'graficos',
      'Análises Visuais',
      'Gráficos de produtos mais vendidos e clientes mais ativos.'
    ),
    mountStep(
      'graficos_1',
      'Análises Visuais',
      'Gráficos de vendas por categoria e receita x quantidade por produto.'
    ),
    mountStep(
      'graficos_2',
      'Estoque em risco',
      'Gráficos que indica produtos com estoque em risco.'
    ),
  ],
  '/customers': [
    mountStep(
      'adicionar_cliente',
      'Cadastro de Clientes',
      'Adicione novos clientes informando dados de contato, endereço e documento (CPF ou CNPJ).'
    ),
    mountStep(
      'tabela_clientes',
      'Lista de Clientes',
      'Visualize todos os clientes cadastrados. É possível editar, inativar ou acessar as recomendações de cada um.'
    ),
    mountStep(
      'botao_recomendacoes',
      'Recomendações Personalizadas',
      'Com base no histórico de compras do cliente, o sistema sugere os produtos com maior probabilidade de interesse.'
    ),
  ],
  '/sales': [
    mountStep(
      'adicionar_venda',
      'Nova Venda',
      'Inicie uma nova venda vinculando ao cliente e adicionando produtos com quantidade e preço.'
    ),
    mountStep(
      'adicionar_item_venda',
      'Adicionar Produto à Venda',
      'Com a venda em aberto, adicione quantos produtos quiser antes de confirmar o pedido.'
    ),
  ],
}
