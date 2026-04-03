import { Card, Col, Row, Typography } from 'antd'
import {
  DollarOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  TagOutlined,
} from '@ant-design/icons'
import styles from './DashboardPage.module.css'
import IndicatorCard from './components/IndicatorCard/IndicatorCard'
import LineChart from './components/charts/LineChart/LineChart'
import BarChart from './components/charts/BarChart/BarChart'
import PieChart from './components/charts/PieChart/PieChart'
import { LineChartBuilder } from './components/charts/builders/LineChartBuilder'
import { BarChartBuilder } from './components/charts/builders/BarChartBuilder'
import { PieChartBuilder } from './components/charts/builders/PieChartBuilder'

const { Title, Paragraph } = Typography

const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

const revenueData = [42000, 38500, 51200, 47800, 63400, 58900, 71200, 68500, 74300, 82100, 79600, 91500]
const salesCountData = [84, 76, 103, 95, 128, 118, 144, 138, 149, 165, 160, 184]

const topProducts = ['Notebook Pro', 'Mouse Sem Fio', 'Monitor 4K', 'Teclado Mec.', 'Headset BT']
const topProductsQty = [320, 280, 195, 175, 142]

const revenueOption = new LineChartBuilder()
  .setTooltip()
  .setLegend()
  .setGrid()
  .setXAxis(months)
  .setYAxis('R$', (val: number) => `R$ ${(val / 1000).toFixed(0)}k`)
  .addSeries('Receita (R$)', revenueData)
  .addSeries('Qtd. Vendas', salesCountData)
  .build()

const topProductsOption = new BarChartBuilder()
  .setTooltip()
  .setGrid('8%', '4%', '8%', '4%')
  .setXAxis(topProducts)
  .setYAxis('Unidades vendidas')
  .addSeries('Quantidade vendida', topProductsQty)
  .build()

const salesStatusOption = new PieChartBuilder()
  .setTooltip()
  .setLegend('horizontal', 'bottom')
  .setSeries(
    [
      { name: 'Confirmada', value: 1248 },
      { name: 'Pendente', value: 312 },
      { name: 'Cancelada', value: 87 },
    ],
    ['40%', '72%'],
  )
  .build()

const formatCurrency = (value: number | string) =>
  `R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`

export default function DashboardPage() {
  return (
    <div className={styles.dashboardPage}>
      <header className={styles.header}>
        <div>
          <Title level={2} style={{ margin: 0 }}>Dashboard</Title>
          <Paragraph style={{ margin: 0 }}>Visão geral do desempenho de vendas</Paragraph>
        </div>
      </header>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <IndicatorCard
            title="Receita Total"
            value={748600}
            formatter={formatCurrency}
            icon={<DollarOutlined />}
            color="var(--ant-color-primary)"
            trend={{ value: 12.5, label: 'vs. mês anterior', positive: true }}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <IndicatorCard
            title="Total de Vendas"
            value={1647}
            suffix="pedidos"
            icon={<ShoppingCartOutlined />}
            color="#1677FF"
            trend={{ value: 8.3, label: 'vs. mês anterior', positive: true }}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <IndicatorCard
            title="Clientes Ativos"
            value={432}
            suffix="clientes"
            icon={<TeamOutlined />}
            color="#722ED1"
            trend={{ value: 3.1, label: 'vs. mês anterior', positive: true }}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <IndicatorCard
            title="Produtos Cadastrados"
            value={218}
            suffix="produtos"
            icon={<TagOutlined />}
            color="#FA8C16"
            trend={{ value: 1.8, label: 'vs. mês anterior', positive: false }}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Receita e Volume de Vendas — 2025" variant="outlined">
            <LineChart option={revenueOption} height="300px" />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Status das Vendas" variant="outlined" style={{ height: '100%' }}>
            <PieChart option={salesStatusOption} height="300px" />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Card title="Top 5 Produtos Mais Vendidos" variant="outlined">
            <BarChart option={topProductsOption} height="260px" />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
