import styles from "./Button.module.css";
function Button({ children, type, handleBtnClick }) {
  return (
    <button
      className={`${styles.btn} ${
        type === "primary"
          ? styles.primary
          : type === "back"
          ? styles.back
          : styles.position
      }`}
      onClick={handleBtnClick}
    >
      {children}
    </button>
  );
}

export default Button;
