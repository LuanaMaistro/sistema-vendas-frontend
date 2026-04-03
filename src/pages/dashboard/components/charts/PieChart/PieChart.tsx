import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'
import { useChartTheme } from '../useChartTheme'

interface PieChartProps {
  option: EChartsOption
  height?: string
}

export default function PieChart({ option, height = '280px' }: PieChartProps) {
  const { isDark, textColor, subTextColor, colors } = useChartTheme()

  const themedOption: EChartsOption = {
    backgroundColor: 'transparent',
    color: option.color ?? colors,
    textStyle: { color: textColor },
    ...option,
    title: option.title
      ? { ...option.title as object, textStyle: { color: textColor }, subtextStyle: { color: subTextColor } }
      : undefined,
    legend: option.legend
      ? { ...option.legend as object, textStyle: { color: subTextColor } }
      : undefined,
  }

  return (
    <ReactECharts
      option={themedOption}
      style={{ height, width: '100%' }}
      theme={isDark ? 'dark' : undefined}
      opts={{ renderer: 'canvas' }}
    />
  )
}
