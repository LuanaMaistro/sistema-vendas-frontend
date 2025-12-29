import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <main className="layoutContainer">

      <div className="sidebar">
      </div>

      <div className="topbar"></div>

      <div className="contentPage">
        <Outlet />
      </div>
    </main>
  )
}
