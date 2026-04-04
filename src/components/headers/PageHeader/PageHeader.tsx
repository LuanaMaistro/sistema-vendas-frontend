import { Typography } from 'antd'
import styles from './PageHeader.module.css'

interface PageHeaderProps {
  title: string
  subtitle?: string
  extra?: React.ReactNode
}

const { Title, Paragraph } = Typography

export default function PageHeader({ title, subtitle, extra }: PageHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Title level={2} style={{ margin: 0, textAlign: 'left' }}>{title}</Title>
        {subtitle && (
          <Paragraph style={{ margin: 0, textAlign: 'left' }}>{subtitle}</Paragraph>
        )}
      </div>
      {extra && <div>{extra}</div>}
    </header>
  )
}
