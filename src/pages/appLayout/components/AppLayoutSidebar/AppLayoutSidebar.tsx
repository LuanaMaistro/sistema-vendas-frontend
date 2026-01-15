import { Link } from 'react-router-dom'
import type RouteConfig from '../../../../routes/RouteConfig'
import { routesConfigs } from '../../../../routes/routes'
import styles from './AppLayoutSidebar.module.css'
import { Tooltip } from 'antd'

export default function AppLayoutSidebar() {

  const systemLogo = (
    <div className={ styles.systemLogo }>
      S
    </div>
  )

  const toLink = (config: RouteConfig) => {
    return (
      <Tooltip
        title={config.title}
        placement='right'
        mouseEnterDelay={0.6}
        key={config.path}
      >
        <Link className={styles.sidebarItem} to={config.path}>
          <span className={styles.itemIcon}>
            {config.icon}
          </span>
        </Link>
      </Tooltip>
    )
  }

  return (
    <div className={styles.sidebar}>

      <div className={styles.systemLogoContainer}>
        {systemLogo}
      </div>

      <nav className={styles.sidebarItemsContainer}>
        {routesConfigs.map(toLink)}
      </nav>

    </div>
  )
}
