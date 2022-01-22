import { FunctionComponent, useEffect, useState } from "react";
import styles from "./Header.module.css";
import { useTheme } from "next-themes";
import Image from "next/image";

// TODO: Improve image/logo using import
const Header: FunctionComponent = (props) => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [logo, setLogo] = useState("");
  useEffect(() => {
    setIsMounted(true);
    setLogo(() =>
      theme === "dark" ? "/img/logo-light.png" : "/img/logo-dark.png"
    );
  }, []);

  const switchTheme = () => {
    if (isMounted) {
      setTheme(theme === "light" ? "dark" : "light");
    }
  };

  useEffect(() => {
    setLogo(() =>
      theme === "dark" ? "/img/logo-light.png" : "/img/logo-dark.png"
    );
  }, [theme]);

  return (
    <header className={styles.container}>
      <div className={styles.logoContainer}>
        {logo && logo.length > 0 && (
          <Image
            src={logo}
            alt="SEWB BLOG Logo."
            width={200}
            height={100}
            layout="fixed"
            priority={true}
          />
        )}
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
