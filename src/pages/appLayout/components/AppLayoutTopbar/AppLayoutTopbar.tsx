import { useLocation } from 'react-router-dom'
import styles from './AppLayoutTopbar.module.css'
import SwitchTheme from './components/SwitchTheme/SwitchTheme'
import { routesConfigs } from '../../../../routes/routes'

export default function AppLayoutTopbar() {
  const { pathname } = useLocation()
  const currentRoute = routesConfigs.find(r => pathname.includes(r.path))
  const pageTitle = currentRoute?.title ?? 'Nexsell'

  useEffect(() => {
    document.title = currentRoute ? `Nexsell - ${currentRoute.title}` : 'Nexsell'
  }, [currentRoute])

  return (
    <div className={styles.topbarContainer}>
      <span className={styles.pageTitle}>{pageTitle}</span>
      <div className={styles.topbarActions}>
        <SwitchTheme />
      </div>
    </div>
  )
}
