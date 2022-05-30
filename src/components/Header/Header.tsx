import { FunctionComponent, useEffect, useState } from 'react';
import styles from './Header.module.css';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import DarkLogo from '/public/img/logo-dark.png';
import LightLogo from '/public/img/logo-light.png';
import { useRouter } from 'next/router';
import { SunIcon, MoonIcon } from '@heroicons/react/solid';
import { useSession, signIn, signOut } from 'utils/session';
import Link from 'next/link';

const DataCyPrefix = 'HeaderComponent';

// TODO: Improve image/logo using import
const Header: FunctionComponent = (props) => {
    const { theme, setTheme } = useTheme();
    const [isMounted, setIsMounted] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const router = useRouter();
    useEffect(() => {
        setIsMounted(true);
        setIsDark(() => theme === 'dark');
    }, []);

    const switchTheme = () => {
        if (isMounted) {
            setTheme(theme === 'light' ? 'dark' : 'light');
        }
    };

    useEffect(() => {
        setIsDark(() => theme === 'dark');
    }, [theme]);

    return (
        <header className={styles.container} data-cy={`${DataCyPrefix}Container`}>
            <div className={styles.logoContainer} data-cy={`${DataCyPrefix}LogoContainer`}>
                {isDark ? (
                    <Image
                        data-cy={`${DataCyPrefix}Logo`}
                        src={LightLogo}
                        className="cursor-pointer"
                        alt="SEWB BLOG Logo."
                        width={200}
                        height={100}
                        onClick={() => router.push('/')}
                    />
                ) : (
                    <Image
                        data-cy={`${DataCyPrefix}Logo`}
                        src={DarkLogo}
                        className="cursor-pointer"
                        alt="SEWB BLOG Logo."
                        width={200}
                        height={100}
                        onClick={() => router.push('/')}
                    />
                )}
            </div>
            <div className={styles.linkContainer} data-cy={`${DataCyPrefix}LinkContainer`}>
                <ul
                    className={styles.linkInnerContainer}
                    data-cy={`${DataCyPrefix}LinkInnerContainer`}
                >
                    <Link href="/our-story" passHref>
                        <li
                            data-cy={`${DataCyPrefix}OurStoryLink`}
                            className={`${
                                router.pathname === '/our-story' && 'border-b-2 border-b-slate-800'
                            }`}
                        >
                            <a>Our story</a>
                        </li>
                    </Link>
                    <Link href="/contact" passHref>
                        <li
                            data-cy={`${DataCyPrefix}ContactLink`}
                            className={`${
                                router.pathname === '/contact' && 'border-b-2 border-b-slate-800'
                            }`}
                        >
                            <a>Contact</a>
                        </li>
                    </Link>
                    <Link href="/faq" passHref>
                        <li
                            data-cy={`${DataCyPrefix}FAQLink`}
                            className={`${
                                router.pathname === '/faq' && 'border-b-2 border-b-slate-800'
                            }`}
                        >
                            <a>FAQ </a>
                        </li>
                    </Link>
                    <li
                        onClick={switchTheme}
                        className="cursor-pointer -mt-1.5 md:-mt-0"
                        data-cy={`${DataCyPrefix}ThemeLink`}
                    >
                        {isDark ? (
                            <SunIcon className="text-yellow-300" height="25" width="25" />
                        ) : (
                            <MoonIcon className="text-gray-900" height="25" width="25" />
                        )}
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
