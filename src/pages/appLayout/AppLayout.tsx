import { Outlet } from "react-router-dom";
import styles from "./AppLayout.module.css"
import AppLayoutSidebar from "./components/AppLayoutSidebar/AppLayoutSidebar";

export default function AppLayout() {
  return (
    <main className={styles.layoutContainer}>
      <AppLayoutSidebar />
      <div className={styles.contentContainer}>
        <div className={styles.topbar}></div>
        <div className={styles.contentPage}></div>
      </div>
    </main>
  )
}
