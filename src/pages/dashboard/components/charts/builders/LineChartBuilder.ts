import type { EChartsOption, SeriesOption } from 'echarts'

export class LineChartBuilder {
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
      boundaryGap: false,
      axisLine: { lineStyle: { color: 'inherit' } },
    }
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

  addSeries(name: string, data: number[], smooth = true): this {
    const series = this.options.series as SeriesOption[]
    series.push({
      name,
      type: 'line',
      data,
      smooth,
      areaStyle: { opacity: 0.15 },
    })
    return this
  }

  setTooltip(formatter?: string): this {
    this.options.tooltip = {
      trigger: 'axis',
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
