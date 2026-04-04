import { Progress, Tooltip } from 'antd'
import styles from './StockIndicator.module.css'

interface StockIndicatorProps {
  level: number
  text: string
}

export default function StockIndicator({ level, text }: StockIndicatorProps) {
  const percentage = ((5 - level) / 5) * 100

  const colors = {
    0: '#52c41a',
    1: '#85ce61',
    2: '#fadb14',
    3: '#ff7a45',
    4: '#f5222d',
    5: '#cf1322',
  }

  const color = colors[level as keyof typeof colors] || '#52c41a'

  return (
    <Tooltip title={text}>
      <div className={styles.indicatorContainer}>
        <Progress
          type="line"
          percent={Math.max(0, percentage)}
          strokeColor={color}
          showInfo={false}
          status={level >= 4 ? 'exception' : 'normal'}
        />
        <div className={styles.indicatorText}>{text}</div>
      </div>
    </Tooltip>
  )
}
