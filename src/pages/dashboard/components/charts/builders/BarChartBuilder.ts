import type { EChartsOption, SeriesOption } from 'echarts'

export class BarChartBuilder {
  private options: EChartsOption = {
    series: [],
  }

  setTitle(text: string, subtext?: string): this {
    this.options.title = { text, subtext }
    return this
  }

  setXAxis(data: string[], name?: string): this {
    const maxLen = Math.max(...data.map(d => d.length))
      ; (this as any)._xLabelMaxLen = maxLen

    this.options.xAxis = {
      type: 'category',
      data,
      name,
      axisLine: { lineStyle: { color: 'inherit' } },

      axisLabel: {
        interval: 0,
        hideOverlap: false,
        rotate: maxLen > 8 ? 30 : 0,
        formatter: (value: string) => {
          const max = 15
          return value.length > max ? value.slice(0, max) + '...' : value
        },
      },
    }
    return this
  }

  setXAxisValue(): this {
    this.options.xAxis = { type: 'value' }
    return this
  }

  setYAxis(name?: string, formatter?: (val: number) => string): this {
    this.options.yAxis = {
      type: 'value',
      name,
      axisLabel: formatter ? { formatter } : undefined,
    }
    return this
  }

  setYAxisCategory(data: string[], maxLabelWidth?: number): this {
    const calculatedWidth = maxLabelWidth
      ?? Math.min(Math.max(...data.map(d => d.length)) * 7, 200)

    this.options.yAxis = {
      type: 'category',
      data,
      axisLabel: {
        interval: 0,
        width: calculatedWidth,
        overflow: 'truncate',
        ellipsis: '...',
      },
    }
      ; (this as any)._yLabelWidth = calculatedWidth
    return this
  }

  addDualYAxis(
    leftName: string,
    rightName: string,
    rightFormatter?: (val: number) => string,
  ): this {
    this.options.yAxis = [
      { type: 'value', name: leftName, position: 'left' },
      {
        type: 'value',
        name: rightName,
        position: 'right',
        axisLabel: rightFormatter ? { formatter: rightFormatter } : undefined,
      },
    ]
    return this
  }

  addSeries(name: string, data: number[], barMaxWidth = 48, yAxisIndex = 0, color?: string): this {
    const series = this.options.series as SeriesOption[]
    series.push({
      name,
      type: 'bar',
      yAxisIndex,
      data,
      barMaxWidth,
      itemStyle: {
        borderRadius: [6, 6, 0, 0],
        ...(color ? { color } : {}),
      },
    })
    return this
  }

  addHorizontalSeries(name: string, data: number[], barMaxWidth = 28, color?: string): this {
    const series = this.options.series as SeriesOption[]
    series.push({
      name,
      type: 'bar',
      data,
      barMaxWidth,
      itemStyle: {
        borderRadius: [0, 6, 6, 0],
        ...(color ? { color } : {}),
      },
    })
    return this
  }

  addLineSeries(name: string, data: number[], yAxisIndex = 1): this {
    const series = this.options.series as SeriesOption[]
    series.push({
      name,
      type: 'line',
      yAxisIndex,
      data,
      smooth: true,
      symbol: 'circle',
      symbolSize: 7,
    })
    return this
  }

  setTooltip(formatter?: string, axisPointer: 'shadow' | 'cross' = 'shadow'): this {
    this.options.tooltip = {
      trigger: 'axis',
      axisPointer: { type: axisPointer },
      formatter: formatter as string | undefined,
    }
    return this
  }

  setLegend(): this {
    const series = this.options.series as SeriesOption[]
    this.options.legend = {
      data: series.map((s) => s.name as string),
    }
    return this
  }

  setGrid(top?: string, right?: string, bottom?: string, left?: string): this {
    const yLabelWidth = (this as any)._yLabelWidth
    const xLabelMaxLen = (this as any)._xLabelMaxLen

    const autoLeft = yLabelWidth ? `${yLabelWidth + 16}px` : '4%'
    const autoBottom = xLabelMaxLen > 10 ? `${Math.min(xLabelMaxLen * 3, 80)}px` : '10%'

    this.options.grid = {
      top: top ?? '10%',
      right: right ?? '4%',
      bottom: bottom ?? autoBottom,
      left: left ?? autoLeft,
      containLabel: false,
    }

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
