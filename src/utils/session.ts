import {
  useQuery,
  QueryClientConfig,
  QueryClientProviderProps,
} from "react-query";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import Router, { useRouter } from "next/router";
import { User } from "@customTypes/user";
import absoluteUrl from "next-absolute-url";
const fetchSession = async () => {
  const cookies = parseCookies();
  const { userJWT, userData } = cookies;
  if (userJWT && userData) {
    const user = JSON.parse(userData) as User;
    return { jwt: userJWT, user };
  }

  return null;
};

type SessionProps = {
  required?: boolean;
  redirectTo?: string;
  queryConfig?: QueryClientConfig;
};

const useSession = ({
  required = false,
  redirectTo = "/api/login?error=SessionExpired",
  queryConfig = {},
}: SessionProps = {}) => {
  const router = useRouter();
  const query = useQuery(["session"], fetchSession, {
    ...queryConfig,
    onSettled(data: User | undefined, error) {
      if (queryConfig.defaultOptions?.queries?.onSettled) {
        queryConfig.defaultOptions?.queries?.onSettled(data, error);
      }
      if (data || !required) return;
      router.push(redirectTo);
    },
  });
  return { data: query.data, loading: query.status === "loading" };
};

const signIn = () => {
  const { origin } = absoluteUrl();
  // TODO test that this always produces the path you expect it to produce i.e. the current
  // TODO path of the page you're visiting
  const pathname = Router.asPath;
  const redirectTo = `${origin}${pathname}`;
  // TODO Consider changing the redirectTo name to something like loginCallbackURL because
  // TODO it represents what it's used for and you may want to use redirectTo for handling
  // TODO global redirects in the app.
  setCookie(null, "redirectTo", redirectTo, {
    sameSite: "lax",
    path: "/",
  });
  Router.push("/api/auth/google");
};
const signOut = () => {
  destroyCookie({}, "userJWT", {
    path: "/",
  });
  destroyCookie({}, "userData", {
    path: "/",
  });
  Router.reload();
};

export { useSession, fetchSession, signIn, signOut };
