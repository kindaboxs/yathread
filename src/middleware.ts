import { NextResponse, type NextRequest } from "next/server";

import { betterFetch } from "@better-fetch/fetch";

import { authRoutes, protectedRoutes } from "@/constants";
import { env } from "@/env";
import { type Session } from "@/lib/auth/types";

export async function middleware(req: NextRequest) {
	const { nextUrl } = req;
	const pathName = nextUrl.pathname;

	const isAuthRoute = authRoutes.some((route) => pathName.startsWith(route));
	const isProtectedRoute = protectedRoutes.some((route) =>
		pathName.startsWith(route)
	);

	const cookies = req.headers.get("cookie") ?? "";

	const { data: session } = await betterFetch<Session>(
		"/api/auth/get-session",
		{
			baseURL: env.NEXT_PUBLIC_APP_URL,
			headers: { cookie: cookies },
		}
	);

	if (isAuthRoute) {
		if (session) {
			return NextResponse.redirect(new URL("/", nextUrl));
		}

		return NextResponse.next();
	}

	if (!session && isProtectedRoute) {
		let redirectUrl = nextUrl.pathname;

		if (nextUrl.search) {
			redirectUrl += nextUrl.search;
		}

		const encodedRedirectUrl = encodeURIComponent(redirectUrl);

		return NextResponse.redirect(
			new URL(`/sign-in?redirect_to=${encodedRedirectUrl}`, nextUrl)
		);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
