import Content from '@/components/Content';
import Link from 'next/link';
export default function Custom404() {
    return (
        <Content classNames="flex items-center mt-10 flex-col mx-10 md:mx-0">
            <h2 className="text-2xl font-bold mb-5">
                Opps... Seems like you&apos;ve lost your way 😲.
            </h2>
            <div className="bg-red-500 md:w-1/2 md:h-96">
                <img src="/img/lost.jpeg" className=" object-cover object-center h-full w-full" />
            </div>
            <Link href="/">
                <a className="py-3 my-5 px-2 rounded-md bg-violet-400 text-white">
                    Let&apos;s get you home{' '}
                </a>
            </Link>
        </Content>
    );
}
