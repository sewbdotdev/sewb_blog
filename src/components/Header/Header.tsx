import { FunctionComponent, useEffect, useState } from "react";
import styles from "./Header.module.css";
import { useTheme } from "next-themes";
import Image from "next/image";
import DarkLogo from "/public/img/logo-dark.png";
import LightLogo from "/public/img/logo-light.png";
import Link from "next/link";

import { SunIcon, MoonIcon } from "@heroicons/react/solid";
import { useSession, signIn, signOut } from "utils/session";
// TODO: Improve image/logo using import
const Header: FunctionComponent = (props) => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { data, loading } = useSession();

  useEffect(() => {
    setIsMounted(true);
    setIsDark(() => theme === "dark");
  }, []);

  const switchTheme = () => {
    if (isMounted) {
      setTheme(theme === "light" ? "dark" : "light");
    }
  };

  useEffect(() => {
    setIsDark(() => theme === "dark");
  }, [theme]);

  return (
    <header className={styles.container}>
      <div className={styles.logoContainer}>
        <Image
          src={isDark ? LightLogo : DarkLogo}
          alt="SEWB BLOG Logo."
          width={200}
          height={100}
          // layout="fixed"
          // priority={true}
        />
      </div>
      <div className={styles.linkContainer}>
        <ul className={styles.linkInnerContainer}>
          <li>Our story</li>
          <li>Contact</li>
          <li>FAQ</li>
          {data && !loading ? (
            <li>
              <Link href="/profile">
                <a>Profile</a>
              </Link>
            </li>
          ) : (
            <a onClick={() => signIn()}>Login</a>
          )}
          {data && !loading && <li onClick={() => signOut()}>Logout</li>}

          <li onClick={switchTheme} className="cursor-pointer">
            {theme === "light" ? (
              <MoonIcon
                className="text-gray-900 hover:animate-bounce"
                height="25"
                width="25"
              />
            ) : (
              <SunIcon
                className="text-yellow-300 hover:animate-bounce"
                height="25"
                width="25"
              />
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
