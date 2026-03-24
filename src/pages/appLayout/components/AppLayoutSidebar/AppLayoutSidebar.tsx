import { NavLink } from 'react-router-dom'
import type RouteConfig from '../../../../routes/RouteConfig'
import { routesConfigs } from '../../../../routes/routes'
import styles from './AppLayoutSidebar.module.css'
import { Avatar } from 'antd'
import { ShopOutlined, UserOutlined } from '@ant-design/icons'

export default function AppLayoutSidebar() {

  const sections = routesConfigs.reduce((acc, route) => {
    const section = route.section ?? 'Geral'
    if (!acc[section]) acc[section] = []
    acc[section].push(route)
    return acc
  }, {} as Record<string, RouteConfig[]>)

  const toLink = (config: RouteConfig) => (
    <NavLink
      key={config.path}
      to={config.path}
      className={({ isActive }) =>
        `${styles.sidebarItem} ${isActive ? styles.sidebarItemActive : ''}`
      }
    >
      <span className={styles.itemIcon}>{config.icon}</span>
      <span className={styles.itemLabel}>{config.title}</span>
    </NavLink>
  )

  return (
    <div className={styles.sidebar}>

      <div className={styles.sidebarHeader}>
        <div className={styles.logoIcon}>
          <ShopOutlined />
        </div>
        <span className={styles.logoText}>Sistema de Vendas</span>
      </div>

      <nav className={styles.sidebarNav}>
        {Object.entries(sections).map(([sectionName, routes]) => (
          <div key={sectionName} className={styles.sidebarSection}>
            <span className={styles.sectionLabel}>{sectionName}</span>
            {routes.map(toLink)}
          </div>
        ))}
      </nav>

      <div className={styles.sidebarFooter}>
        <Avatar icon={<UserOutlined />} size={32} style={{ flexShrink: 0 }} />
        <div className={styles.userInfo}>
          <span className={styles.userName}>Administrador</span>
          <span className={styles.userEmail}>admin@sistema.com</span>
        </div>
      </div>

    </div>
  )
}
