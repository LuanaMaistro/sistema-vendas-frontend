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
    this.options.xAxis = {
      type: 'category',
      data,
      name,
      axisLine: { lineStyle: { color: 'inherit' } },
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

  setYAxisCategory(data: string[]): this {
    this.options.yAxis = {
      type: 'category',
      data,
      axisLabel: { width: 120, overflow: 'truncate' },
    }
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
    this.options.grid = {
      top: top ?? '10%',
      right: right ?? '4%',
      bottom: bottom ?? '10%',
      left: left ?? '4%',
      containLabel: true,
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
