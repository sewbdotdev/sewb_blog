import cookies from "next-cookies";
import { TokenData } from "@customTypes/token";

class Helpers {
  static isSSR(): boolean {
    return typeof window === "undefined";
  }
  static isProduction(): boolean {
    return process.env.NODE_ENV === "production";
  }
  static isDevelopment(): boolean {
    return process.env.NODE_ENV === "development";
  }
  static isTesting(): boolean {
    return process.env.NODE_ENV === "test";
  }

  static getAPIEndpoint() {
    if (Helpers.isSSR()) {
      return String(process.env.API_ENDPOINT);
    } else {
      return String(process.env.NEXT_PUBLIC_API_ENDPOINT);
    }
  }
  static getToken(ctx = {}) {
    let token = "";

    if (Helpers.isSSR()) {
      token = cookies(ctx).token ?? "";
    } else {
      token = localStorage.getItem("token") ?? "";
    }
    return token;
  }

  static setToken(data: TokenData) {
    if (!data) {
      return;
    }

    document.cookie = `token=${data.token}; path=/`;
    localStorage.setItem("token", data.token);
  }
}

export default Helpers;
