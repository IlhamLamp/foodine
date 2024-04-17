import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const token = await getToken({
        req: req,
        secret: process.env.NEXTAUTH_SECRET,
    });
    console.log(token);

    const publicPaths = path === "/login" || path === "/register";
    const isAuthorizedPath = path.startsWith("/dashboard");

    if (publicPaths && token) {
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl))
    }
    if (!publicPaths && !token && !isAuthorizedPath) {
        return NextResponse.redirect(new URL("/login", req.nextUrl))
    }
    if (token && isAuthorizedPath) {
        return NextResponse.next();
    }
}

export const config = {
    matcher: ["/login", "/register", "/dashboard"],
}