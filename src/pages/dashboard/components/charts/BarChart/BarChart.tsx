import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'
import { useChartTheme } from '../useChartTheme'

interface BarChartProps {
  option: EChartsOption
  height?: string
}

export default function BarChart({ option, height = '280px' }: BarChartProps) {
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
      ? Array.isArray(option.xAxis)
        ? option.xAxis.map(axis => ({
            ...axis as object,
            axisLabel: { color: subTextColor },
            axisLine: { lineStyle: { color: splitLineColor } },
            splitLine: { lineStyle: { color: splitLineColor } },
          }))
        : {
            ...option.xAxis as object,
            axisLabel: { color: subTextColor },
            axisLine: { lineStyle: { color: splitLineColor } },
            splitLine: { lineStyle: { color: splitLineColor } },
          }
      : undefined,
    yAxis: option.yAxis
      ? Array.isArray(option.yAxis)
        ? option.yAxis.map(axis => ({
            ...axis as object,
            axisLabel: { ...(axis as { axisLabel?: object }).axisLabel, color: subTextColor },
            splitLine: { lineStyle: { color: splitLineColor } },
          }))
        : {
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
