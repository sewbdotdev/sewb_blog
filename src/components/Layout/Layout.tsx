import React, { FunctionComponent } from 'react';
import Head from 'next/head';
import Header from '../Header';
import Feature from '../Feature';
import styles from './Layout.module.css';
const Layout: FunctionComponent = (props): JSX.Element => {
    return (
        <main>
            <Header />
            <section className={styles.childrenContainer}>{props.children}</section>
        </main>
    );
};

export default Layout;
