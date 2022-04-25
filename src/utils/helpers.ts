import cookies from 'next-cookies';
import { TokenData } from '@customTypes/token';

type getStaleTimeProps =
    | 'posts'
    | 'allCategories'
    | 'faq'
    | 'our-story'
    | 'allTags'
    | 'categoryPosts'
    | 'tagPosts';
class Helpers {
    static isSSR(): boolean {
        return typeof window === 'undefined';
    }
    static isProduction(): boolean {
        const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV || '';
        return APP_ENV === 'production';
    }
    static isDevelopment(): boolean {
        return process.env.NODE_ENV === 'development';
    }
    static isTesting(): boolean {
        return process.env.NODE_ENV === 'test';
    }

    static getAPIEndpoint() {
        if (Helpers.isSSR()) {
            return String(process.env.API_ENDPOINT);
        } else {
            return String(process.env.NEXT_PUBLIC_API_ENDPOINT);
        }
    }
    static getToken(ctx = {}) {
        let token = '';

        if (Helpers.isSSR()) {
            token = cookies(ctx).token ?? '';
        } else {
            token = localStorage.getItem('token') ?? '';
        }
        return token;
    }

    static setToken(data: TokenData) {
        if (!data) {
            return;
        }

        document.cookie = `token=${data.token}; path=/`;
        localStorage.setItem('token', data.token);
    }

    static getImageURL(src: string): string {
        if (src.startsWith('/')) {
            return `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}${src}`;
        } else {
            return src;
        }
    }

    static replace(item: string, remove = '-', add = ' '): string {
        let output = '';

        for (let i = 0; i < item.length; i++) {
            if (item[i] === remove) {
                output += add;
            } else {
                output += item[i];
            }
        }
        return output;
    }

    static capitalize(item: string): string {
        const splitItem = item.split(' ');
        let output = [];
        for (let i = 0; i < splitItem.length; i++) {
            const tmp = splitItem[i].toLowerCase();
            output.push(tmp[0].toUpperCase() + tmp.slice(1));
        }

        return output.join(' ');
    }

    static booleanParser(envValue: string | undefined) {
        if (!envValue) {
            return false;
        }

        if (envValue === 'true') {
            return true;
        }

        return false;
    }

    static getStaleTime(query: getStaleTimeProps) {
        /*
            hour - milliseconds
            24 hours -> 86400000
            2 hours -> 7200000
        */
        const staleTimes = {
            posts: 86400000,
            allCategories: Infinity,
            faq: Infinity,
            'our-story': Infinity,
            allTags: Infinity,
            categoryPosts: 7200000,
            tagPosts: 7200000
        };

        return staleTimes[query];
    }

    static getMaximumPostCountForBuild() {
        const postCountEnv = process.env.NEXT_PUBLIC_POST_COUNT;

        if (!postCountEnv) {
            return 1000;
        }

        return Number(postCountEnv);
    }

    static getSupportedLanguages() {
        return [
            'className',
            'language-js',
            'language-css',
            'language-md',
            'language-python',
            'language-java',
            'language-go',
            'language-rust',
            'language-typescript',
            'language-csharp',
            'language-django',
            'language-sql',
            'language-yaml',
            'language-shell',
            'language-markdown',
            'language-json',
            'language-javascript',
            'language-dockerfile',
            'language-css',
            'language-cpp'
        ];
    }
}

export default Helpers;
