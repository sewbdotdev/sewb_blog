import { FunctionComponent, useEffect, useState } from "react";
import styles from "./Header.module.css";
import { useTheme } from "next-themes";
const Header: FunctionComponent = (props) => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const switchTheme = () => {
    if (isMounted) {
      setTheme(theme === "light" ? "dark" : "light");
    }
  };

  return (
    <header className={styles.container}>
      <div className={styles.logoContainer}>
        <h3>SEWB BLOG</h3>
      </div>
      <div className={styles.linkContainer}>
        <ul className={styles.linkInnerContainer}>
          <li>Our story</li>
          <li>Contact</li>
          <li>FAQ</li>
          <li onClick={switchTheme} className="cursor-pointer">
            {theme === "light" ? "Dark" : "Light"}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
