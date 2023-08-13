import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";
function AppNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <NavLink to="city">City</NavLink>
        <NavLink to="country">Country</NavLink>
      </ul>
    </nav>
  );
}

export default AppNav;
