import AppSideBar from "./AppSideBar";
import styles from "./AppLayout.module.css";
import Map from "./Map";
function AppLayout() {
  return (
    <div className={styles.app}>
      <AppSideBar />
      <Map />
    </div>
  );
}

export default AppLayout;
