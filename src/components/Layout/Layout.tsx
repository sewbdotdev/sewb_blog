import React, { FunctionComponent } from "react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Header from "../Header";
import Feature from "../Feature";

const Layout: FunctionComponent = (props): JSX.Element => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <main>
      <Header />
      <Feature />
      {props.children}
    </main>
  );
};

export default Layout;
