import { Card, Statistic } from 'antd'
import type { ReactNode } from 'react'
import styles from './IndicatorCard.module.css'

interface IndicatorCardProps {
  title: string
  value: number | string
  prefix?: ReactNode
  suffix?: string
  formatter?: (value: number | string) => ReactNode
  trend?: {
    value: number
    label: string
    positive?: boolean
  }
  icon?: ReactNode
  color?: string
}

export default function IndicatorCard({
  title,
  value,
  prefix,
  suffix,
  formatter,
  trend,
  icon,
  color = 'var(--ant-color-primary)',
}: IndicatorCardProps) {
  return (
    <Card className={styles.card} variant="outlined">
      <div className={styles.cardContent}>
        <div className={styles.cardMain}>
          <Statistic
            title={title}
            value={value}
            prefix={prefix}
            suffix={suffix}
            formatter={formatter}
            valueStyle={{ fontWeight: 700 }}
          />
          {trend && (
            <span
              className={styles.trend}
              style={{ color: trend.positive ? '#52C41A' : '#FF4D4F' }}
            >
              {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}% {trend.label}
            </span>
          )}
        </div>
        {icon && (
          <div className={styles.iconWrapper} style={{ backgroundColor: color + '1A' }}>
            <span className={styles.icon} style={{ color }}>
              {icon}
            </span>
          </div>
        )}
      </div>
    </Card>
  )
}
