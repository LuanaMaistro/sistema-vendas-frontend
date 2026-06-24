import { NavLink, useNavigate } from 'react-router-dom'
import type RouteConfig from '../../../../routes/RouteConfig'
import { routesConfigs } from '../../../../routes/routes'
import styles from './AppLayoutSidebar.module.css'
import { Avatar, Button, Modal } from 'antd'
import { LogoutOutlined, ShopOutlined, UserOutlined, MoonOutlined, SunOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { useAuth } from '../../../../hooks/useAuth'
import { useTheme } from '../../../../hooks/useTheme'
import { useTour } from '@/tour/useTour'

export default function AppLayoutSidebar() {

  const navigate = useNavigate()
  const { user } = useAuth()
  const clearToken = useAuth(s => s.clearToken)
  const { theme, toggleTheme } = useTheme()

  function handleLogout() {
    Modal.confirm({
      title: 'Sair do sistema',
      content: 'Realmente deseja sair do sistema?',
      okText: 'Sair',
      cancelText: 'Cancelar',
      okButtonProps: { danger: true },
      onOk() {
        clearToken()
        navigate('/')
      },
    })
  }

  const sections = routesConfigs.reduce((acc, route) => {
    const section = route.section ?? 'Geral'
    if (!acc[section]) acc[section] = []
    acc[section].push(route)
    return acc
  }, {} as Record<string, RouteConfig[]>)

  const { startTour, isOnTour } = useTour()

  const toggleTour = () => {
    startTour()
  }

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

  const activeIcon = (
    <span className={styles.iconWrap}>
      <QuestionCircleOutlined />

      <svg className={styles.orbitSvg} viewBox="0 0 16 16">
        <circle className={styles.neonRing} cx="8" cy="8" r="7" />

        <ellipse className={styles.neonBeam} rx="3.5" ry="1.2">
          <animateMotion dur="2s" repeatCount="indefinite" rotate="auto">
            <mpath href="#orbitPath" />
          </animateMotion>
        </ellipse>
        <path id="orbitPath" d="M 8,1 A 7,7 0 1 1 7.9999,1 Z" fill="none" />
      </svg>
    </span>
  )

  return (
    <div className={styles.sidebar}>

      <div className={styles.sidebarHeader}>
        <div className={styles.logoIcon}>
          <ShopOutlined />
        </div>
        <span className={styles.logoText}>Nexsell</span>
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
          <span className={styles.userName}>{user?.name}</span>
          <span className={styles.userEmail}>{user?.email}</span>
        </div>
        <Button
          type="text"
          icon={isOnTour ? activeIcon : <QuestionCircleOutlined />}
          onClick={toggleTour}
          size="small"
          className={styles.themeButton}
        />
        <Button
          type="text"
          icon={theme === 'light' ? <SunOutlined /> : <MoonOutlined />}
          onClick={toggleTheme}
          size="small"
          className={styles.themeButton}
        />
        <LogoutOutlined className={styles.logoutIcon} onClick={handleLogout} />
      </div>

    </div>
  )
}