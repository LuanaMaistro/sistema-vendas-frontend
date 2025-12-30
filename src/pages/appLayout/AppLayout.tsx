import { Outlet } from "react-router-dom";
import styles from "./AppLayout.module.css"

export default function AppLayout() {
  return (
    <main className={styles.layoutContainer}>
      <div className={styles.sidebar}></div>
      <div className={styles.contentContainer}>
        <div className={styles.topbar}></div>
        <div className={styles.contentPage}></div>
      </div>
    </main>
  )
}
