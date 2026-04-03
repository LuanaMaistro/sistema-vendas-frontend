import type { EChartsOption } from 'echarts'

export interface PieDataItem {
  name: string
  value: number
}

export class PieChartBuilder {
  private options: EChartsOption = {}

  setTitle(text: string, subtext?: string): this {
    this.options.title = { text, subtext, left: 'center' }
    return this
  }

  setTooltip(): this {
    this.options.tooltip = {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    }
    return this
  }

  setLegend(orient: 'horizontal' | 'vertical' = 'horizontal', position: 'bottom' | 'right' = 'bottom'): this {
    this.options.legend = {
      orient,
      bottom: position === 'bottom' ? '4%' : undefined,
      right: position === 'right' ? '4%' : undefined,
      top: position === 'right' ? 'center' : undefined,
    }
    return this
  }

  setSeries(data: PieDataItem[], radius: [string, string] = ['40%', '70%'], center: [string, string] = ['50%', '50%']): this {
    this.options.series = [
      {
        type: 'pie',
        radius,
        center,
        data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        label: {
          formatter: '{b}\n{d}%',
        },
      },
    ]
    return this
  }

  setColors(colors: string[]): this {
    this.options.color = colors
    return this
  }

  build(): EChartsOption {
    return { ...this.options }
  }
}
