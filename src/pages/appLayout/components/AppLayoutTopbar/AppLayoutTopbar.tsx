import { UserOutlined } from '@ant-design/icons'
import styles from './AppLayoutTopbar.module.css'
import { Avatar } from 'antd'
import SwitchTheme from './components/SwitchTheme/SwitchTheme'
import NotificationsBell from './components/NotificationsBell/NotificationsBell'

export default function AppLayoutTopbar() {
  return (
    <div className={styles.topbarContainer}>
      <NotificationsBell />
      <SwitchTheme />
      <Avatar icon={<UserOutlined />} />
    </div>
  )
}
