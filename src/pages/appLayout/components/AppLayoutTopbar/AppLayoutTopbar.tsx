import { BellOutlined, UserOutlined } from '@ant-design/icons'
import styles from './AppLayoutTopbar.module.css'
import { Avatar } from 'antd'
import SwitchTheme from './components/SwitchTheme'

export default function AppLayoutTopbar() {
  return (
    <div className={styles.topbarContainer}>
      <BellOutlined />
      <SwitchTheme />
      <Avatar icon={<UserOutlined />} />
    </div>
  )
}
