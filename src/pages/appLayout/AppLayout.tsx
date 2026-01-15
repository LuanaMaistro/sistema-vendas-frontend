import { Outlet } from "react-router-dom";
import styles from "./AppLayout.module.css"
import AppLayoutSidebar from "./components/AppLayoutSidebar/AppLayoutSidebar";
import AppLayoutTopbar from "./components/AppLayoutTopbar/AppLayoutTopbar";

export default function AppLayout() {
  return (
    <main className={styles.layoutContainer}>
      <AppLayoutSidebar />
      <div className={styles.contentContainer}>
        <AppLayoutTopbar />
        <div className={styles.contentPage}>
          <Outlet />
        </div>
      </div>
    </main>
  )
}
