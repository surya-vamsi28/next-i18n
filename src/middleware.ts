import { NextResponse, type NextRequest } from "next/server";

import { i18nRouter } from "next-i18n-router";
import i18nConfig from "../i18nConfig";

export function middleware(request: NextRequest) {
  const response = i18nRouter(request, i18nConfig);

  // Check if the request is for a global route and rewrite it
  const url = request.nextUrl.clone();

  const includesLocale = i18nConfig.locales.some((locale) => {
    return url.pathname.includes(locale);
  })

  if (url.pathname.startsWith("/global")) {
    if (!includesLocale) {
        url.pathname = url.pathname.replace(/^\/global/, "");
         url.pathname = `/en${url.pathname}`
         return NextResponse.rewrite(url);
    }

    // Rewriting the global path to the intended destination
    url.pathname = url.pathname.replace(/^\/global/, "");
    return NextResponse.rewrite(url);
  }
  if (
    !includesLocale
  ) {
    url.pathname = `/en${url.pathname}`
    return NextResponse.rewrite(url);
  }

  return response;
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
