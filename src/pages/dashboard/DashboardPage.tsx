import { Card, Col, DatePicker, Row, Select, Spin, Typography } from 'antd'
import { DollarOutlined, ShoppingCartOutlined, TagOutlined } from '@ant-design/icons'
import type { Dayjs } from 'dayjs'
import type { EChartsOption } from 'echarts'
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

function buildReceitaQuantidadeOption(porProduto: ProdutoMaisVendidoDTO[]): EChartsOption {
  const nomes = porProduto.map(p => p.produtoNome ?? '')
  const quantidades = porProduto.map(p => p.quantidadeVendida ?? 0)
  const receitas = porProduto.map(p => p.valorTotal ?? 0)

  return {
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
    legend: { data: ['Qtd. Vendida', 'Receita (R$)'] },
    grid: { top: '14%', right: '8%', bottom: '8%', left: '4%', containLabel: true },
    xAxis: { type: 'category', data: nomes, axisLine: { lineStyle: { color: 'inherit' } } },
    yAxis: [
      { type: 'value', name: 'Qtd. Vendida', position: 'left' },
      {
        type: 'value',
        name: 'Receita',
        position: 'right',
        axisLabel: { formatter: (v: number) => `R$ ${(v / 1000).toFixed(0)}k` },
      },
    ],
    series: [
      {
        name: 'Qtd. Vendida',
        type: 'bar',
        yAxisIndex: 0,
        data: quantidades,
        barMaxWidth: 48,
        itemStyle: { borderRadius: [6, 6, 0, 0] },
      },
      {
        name: 'Receita (R$)',
        type: 'line',
        yAxisIndex: 1,
        data: receitas,
        smooth: true,
        symbol: 'circle',
        symbolSize: 7,
      },
    ],
  }
}

function buildEstoqueRiscoOption(itens: RelatorioEstoqueItemDTO[]): EChartsOption {
  const emRisco = itens.filter(i => i.abaixoDoMinimo)
  const nomes = emRisco.map(i => i.produtoNome ?? '')
  const quantidades = emRisco.map(i => i.quantidade ?? 0)
  const minimos = emRisco.map(i => i.quantidadeMinima ?? 0)

  return {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: { data: ['Estoque atual', 'Mínimo'] },
    grid: { top: '10%', right: '4%', bottom: '4%', left: '4%', containLabel: true },
    xAxis: { type: 'value' },
    yAxis: {
      type: 'category',
      data: nomes,
      axisLabel: { width: 120, overflow: 'truncate' },
    },
    series: [
      {
        name: 'Estoque atual',
        type: 'bar',
        data: quantidades,
        barMaxWidth: 28,
        itemStyle: { color: '#FF4D4F', borderRadius: [0, 6, 6, 0] },
      },
      {
        name: 'Mínimo',
        type: 'bar',
        data: minimos,
        barMaxWidth: 28,
        itemStyle: { color: '#FA8C16', borderRadius: [0, 6, 6, 0] },
      },
    ],
  }
}

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

  const receitaQuantidadeOption = buildReceitaQuantidadeOption(porProduto)
  const estoqueRiscoOption = buildEstoqueRiscoOption(estoque?.itens ?? [])

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
