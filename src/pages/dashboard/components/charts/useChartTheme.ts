import { useTheme } from '../../../../hooks/useTheme'

export interface ChartTheme {
  isDark: boolean
  textColor: string
  subTextColor: string
  splitLineColor: string
  colors: string[]
}

export function useChartTheme(): ChartTheme {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return {
    isDark,
    textColor: isDark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.88)',
    subTextColor: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)',
    splitLineColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
    colors: isDark
      ? ['#1ADBC8', '#52C4FF', '#FF7875', '#FAAD14', '#B37FEB', '#36CFC9']
      : ['#00B298', '#1677FF', '#FF4D4F', '#FAAD14', '#722ED1', '#13C2C2'],
  }
}
