import { FunctionComponent, useEffect, useState } from "react";
import styles from "./Header.module.css";
import { useTheme } from "next-themes";
import Image from "next/image";
const Header: FunctionComponent = (props) => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [isDark, setIsDark] = useState(theme === "dark");
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const switchTheme = () => {
    if (isMounted) {
      setTheme(theme === "light" ? "dark" : "light");
    }
  };

  useEffect(() => {
    setIsDark(theme === "dark");
  }, [theme]);

  return (
    <header className={styles.container}>
      <div className={styles.logoContainer}>
        <Image
          src={`/img/logo-${isDark ? "light" : "dark"}.png`}
          alt="SEWB BLOG Logo."
          width={200}
          height={100}
          layout="fixed"
          priority={true}
        />
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
