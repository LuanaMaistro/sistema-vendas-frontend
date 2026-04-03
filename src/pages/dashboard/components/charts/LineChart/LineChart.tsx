import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'
import { useChartTheme } from '../useChartTheme'

interface LineChartProps {
  option: EChartsOption
  height?: string
}

export default function LineChart({ option, height = '280px' }: LineChartProps) {
  const { isDark, textColor, subTextColor, splitLineColor, colors } = useChartTheme()

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
    xAxis: option.xAxis
      ? {
          ...option.xAxis as object,
          axisLabel: { color: subTextColor },
          axisLine: { lineStyle: { color: splitLineColor } },
          splitLine: { lineStyle: { color: splitLineColor } },
        }
      : undefined,
    yAxis: option.yAxis
      ? {
          ...option.yAxis as object,
          axisLabel: { color: subTextColor },
          splitLine: { lineStyle: { color: splitLineColor } },
        }
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
