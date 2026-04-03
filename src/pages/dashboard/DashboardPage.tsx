import { Card, Col, DatePicker, Row, Select, Spin, Typography } from 'antd'
import { DollarOutlined, ShoppingCartOutlined, TagOutlined } from '@ant-design/icons'
import type { Dayjs } from 'dayjs'
import styles from './DashboardPage.module.css'
import IndicatorCard from './components/IndicatorCard/IndicatorCard'
import BarChart from './components/charts/BarChart/BarChart'
import PieChart from './components/charts/PieChart/PieChart'
import { BarChartBuilder } from './components/charts/builders/BarChartBuilder'
import { PieChartBuilder } from './components/charts/builders/PieChartBuilder'
import { useRelatorios } from './hooks/useRelatorios'
import type { TopOption } from './hooks/useRelatorios'
import type { ProdutoMaisVendidoDTO, RelatorioEstoqueItemDTO } from '../../infra/api/api'


const { Title, Paragraph } = Typography
const { RangePicker } = DatePicker

const TOP_OPTIONS = [
  { label: 'Top 5', value: 5 },
  { label: 'Top 10', value: 10 },
  { label: 'Top 15', value: 15 },
  { label: 'Top 30', value: 30 },
]

const formatCurrency = (value: number | string) =>
  `R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`


function buildEstoqueRiscoOption(itens: RelatorioEstoqueItemDTO[]) {
  const emRisco = itens.filter(i => i.abaixoDoMinimo)
  return }

export default function DashboardPage() {
  const {
    totalPedidos,
    valorTotal,
    ticketMedio,
    porProduto,
    porCliente,
    porCategoria,
    estoque,
    loading,
    dateRange,
    topProduto,
    topCliente,
    topCategoria,
    handleDateRangeChange,
    handleTopProdutoChange,
    handleTopClienteChange,
    handleTopCategoriaChange,
  } = useRelatorios()

  const porProdutoOption = new BarChartBuilder()
    .setTooltip()
    .setGrid('8%', '4%', '8%', '4%')
    .setXAxis(porProduto.map(p => p.produtoNome ?? ''))
    .setYAxis('Unidades vendidas')
    .addSeries('Quantidade vendida', porProduto.map(p => p.quantidadeVendida ?? 0))
    .build()

  const porClienteOption = new BarChartBuilder()
    .setTooltip()
    .setGrid('8%', '4%', '8%', '4%')
    .setXAxis(porCliente.map(c => c.clienteNome ?? ''))
    .setYAxis('Total de pedidos')
    .addSeries('Pedidos', porCliente.map(c => c.totalPedidos ?? 0))
    .build()

  const porCategoriaOption = new PieChartBuilder()
    .setTooltip()
    .setLegend('horizontal', 'bottom')
    .setSeries(
      porCategoria.map(c => ({ name: c.categoria ?? '', value: c.quantidadeVendida ?? 0 })),
      ['40%', '72%'],
    )
    .build()

  const receitaQuantidadeOption = new BarChartBuilder()
    .setTooltip(undefined, 'cross')
    .setGrid('14%', '8%', '8%', '4%')
    .setXAxis(porProduto.map(p => p.produtoNome ?? ''))
    .addDualYAxis('Qtd. Vendida', 'Receita', (v: number) => `R$ ${(v / 1000).toFixed(0)}k`)
    .setLegend()
    .addSeries('Qtd. Vendida', porProduto.map(p => p.quantidadeVendida ?? 0), 48, 0)
    .addLineSeries('Receita (R$)', porProduto.map(p => p.valorTotal ?? 0), 1)
    .build()

  const retornaProdutosEmRisco = () => {
    const emRisco = estoque?.itens?.filter(i => i.abaixoDoMinimo) ?? []
    return emRisco.sort((a, b) => (b.quantidadeMinima ?? 0) - (a.quantidadeMinima ?? 0))
  }

  const estoqueRiscoOption = new BarChartBuilder()
    .setTooltip()
    .setGrid('10%', '4%', '4%', '4%')
    .setXAxisValue()
    .setYAxisCategory(retornaProdutosEmRisco().map(i => i.produtoNome ?? ''))
    .setLegend()
    .addHorizontalSeries('Estoque atual', retornaProdutosEmRisco().map(i => i.quantidade ?? 0), 28, '#FF4D4F')
    .addHorizontalSeries('Mínimo', retornaProdutosEmRisco().map(i => i.quantidadeMinima ?? 0), 28, '#FA8C16')
    .build()


  return (
    <div className={styles.dashboardPage}>
      <header className={styles.header}>
        <div>
          <Title level={2} style={{ margin: 0 }}>Relatórios</Title>
          <Paragraph style={{ margin: 0 }}>Visão geral do desempenho de vendas</Paragraph>
        </div>
        <RangePicker
          value={dateRange as [Dayjs, Dayjs] | null}
          onChange={range => handleDateRangeChange(range as [Dayjs | null, Dayjs | null] | null)}
          format="DD/MM/YYYY"
          allowClear
        />
      </header>

      <Spin spinning={loading}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={8}>
            <IndicatorCard
              title="Total de Pedidos"
              value={totalPedidos?.totalPedidos ?? 0}
              suffix="pedidos"
              icon={<ShoppingCartOutlined />}
              color="#1677FF"
            />
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <IndicatorCard
              title="Valor Total de Vendas"
              value={valorTotal?.valorTotal ?? 0}
              formatter={formatCurrency}
              icon={<DollarOutlined />}
              color="var(--ant-color-primary)"
            />
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <IndicatorCard
              title="Ticket Médio"
              value={ticketMedio?.ticketMedio ?? 0}
              formatter={formatCurrency}
              icon={<TagOutlined />}
              color="#722ED1"
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Card
              title="Top Produtos Mais Vendidos"
              variant="outlined"
              extra={
                <Select
                  value={topProduto}
                  options={TOP_OPTIONS}
                  onChange={(val: TopOption) => handleTopProdutoChange(val)}
                  size="small"
                  style={{ width: 90 }}
                />
              }
            >
              <BarChart option={porProdutoOption} height="280px" />
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card
              title="Top Clientes Compradores"
              variant="outlined"
              extra={
                <Select
                  value={topCliente}
                  options={TOP_OPTIONS}
                  onChange={(val: TopOption) => handleTopClienteChange(val)}
                  size="small"
                  style={{ width: 90 }}
                />
              }
            >
              <BarChart option={porClienteOption} height="280px" />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Card
              title="Vendas por Categoria"
              variant="outlined"
              extra={
                <Select
                  value={topCategoria}
                  options={TOP_OPTIONS}
                  onChange={(val: TopOption) => handleTopCategoriaChange(val)}
                  size="small"
                  style={{ width: 90 }}
                />
              }
            >
              <PieChart option={porCategoriaOption} height="300px" />
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card
              title="Receita vs Quantidade por Produto"
              variant="outlined"
              extra={
                <Select
                  value={topProduto}
                  options={TOP_OPTIONS}
                  onChange={(val: TopOption) => handleTopProdutoChange(val)}
                  size="small"
                  style={{ width: 90 }}
                />
              }
            >
              <BarChart option={receitaQuantidadeOption} height="300px" />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <Card
              title={`Estoque em Risco — ${estoque?.produtosAbaixoDoMinimo ?? 0} produto(s) abaixo do mínimo`}
              variant="outlined"
            >
              <BarChart
                option={estoqueRiscoOption}
                height={`${Math.max(180, (estoque?.itens?.filter(i => i.abaixoDoMinimo)?.length ?? 0) * 40 + 60)}px`}
              />
            </Card>
          </Col>
        </Row>
      </Spin>
    </div>
  )
}
