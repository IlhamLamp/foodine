import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const token = await getToken({
        req: req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const isAuthorizedPath = path.includes("/dashboard/") || path === "/checkout";
    if (isAuthorizedPath && !token) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
    if (isAuthorizedPath && token) {
        return NextResponse.next();
    }

    const publicPaths = path === "/login" || path === "/register";
    if (publicPaths && token) {
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl))
    }
    if (!publicPaths && !token && !isAuthorizedPath) {
        return NextResponse.redirect(new URL("/login", req.nextUrl))
    }
}

export const config = {
    matcher: ["/login", "/register", "/dashboard/:path*", "/checkout"],
}