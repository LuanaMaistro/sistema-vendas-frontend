import { Link } from 'react-router-dom'
import type AppRoute from '../../../../routes/AppRoute'
import { routesConfigs } from '../../../../routes/routes'
import styles from './AppLayoutSidebar.module.css'

export default function AppLayoutSidebar() {

  const systemLogo = (
    <div className={ styles.systemLogo }>
      S
    </div>
  )

  const toLink = (config: AppRoute) => {
    return (
      <Link key={config.path} to={config.path}>
        {config.title}
      </Link>
    )
  }

  return (
    <div>

      <div className={styles.systemLogoContainer}>
        {systemLogo}
      </div>

      <nav>
        {routesConfigs.map(toLink)}
      </nav>

    </div>
  )
}
