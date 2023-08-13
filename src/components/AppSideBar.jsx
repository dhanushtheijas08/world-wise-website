import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import styles from "./AppSideBar.module.css";
import Logo from "./Logo";
function AppSideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />
    </div>
  );
}

export default AppSideBar;
