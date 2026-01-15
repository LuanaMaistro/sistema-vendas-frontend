import styles from './NotificationsBell.module.css'
import { BellOutlined } from "@ant-design/icons";

export default function NotificationsBell() {
  return (
    <div className={styles.notificationsContainer}>
      <BellOutlined />
    </div>
  )
}
