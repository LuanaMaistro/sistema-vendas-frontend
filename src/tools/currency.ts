export const formatCurrency = (value?: number | string) => {
  if (value === undefined) return '-'
  return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
