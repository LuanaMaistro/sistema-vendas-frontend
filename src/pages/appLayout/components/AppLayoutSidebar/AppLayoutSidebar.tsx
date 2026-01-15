import { Link } from 'react-router-dom'
import type RouteConfig from '../../../../routes/RouteConfig'
import { routesConfigs } from '../../../../routes/routes'
import styles from './AppLayoutSidebar.module.css'

export default function AppLayoutSidebar() {

  const systemLogo = (
    <div className={ styles.systemLogo }>
      S
    </div>
  )

  const toLink = (config: RouteConfig) => {
    return (
      <Link className={styles.sidebarItem} key={config.path} to={config.path}>
        <span className={styles.itemIcon}>
          {config.icon}
        </span>
      </Link>
    )
  }

  return (
    <div>

      <div className={styles.systemLogoContainer}>
        {systemLogo}
      </div>

      <nav className={styles.sidebarItemsContainer}>
        {routesConfigs.map(toLink)}
      </nav>

    </div>
  )
}
