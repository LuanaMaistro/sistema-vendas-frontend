import styles from './AppLayoutTopbar.module.css'

interface AppLayoutTopbarProps {
  className: string
}
export default function AppLayoutTopbar({ className }: AppLayoutTopbarProps) {
  return (
    <div className={styles.topbar}></div>
  )
}
