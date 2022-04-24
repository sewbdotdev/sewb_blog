import { useEffect, useState } from 'react';

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

export default function Comment() {
    const { theme } = useTheme();
    const [isMounted, setIsMounted] = useState(false);
    const [commentTheme, setCommentTheme] = useState(theme);

    useEffect(() => {
        setIsMounted(true);
        setCommentTheme(theme);
    }, []);

    useEffect(() => {
        setCommentTheme(theme);
    }, [theme]);
    return (
        <>
            {isMounted ? (
                <Giscus
                    repo="sewbdotdev/sewb_blog_comments"
                    repoId="R_kgDOHMeoug"
                    category="Announcements"
                    categoryId="DIC_kwDOHMeous4COpEr"
                    mapping="pathname"
                    reactionsEnabled="1"
                    emitMetadata="1"
                    theme={commentTheme}
                    inputPosition="top"
                    loading="lazy"
                    lang={'en'}
                />
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
}
