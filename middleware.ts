import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


const secret = process.env.NEXTAUTH_SECRET;


export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret }); 

  const { pathname } = req.nextUrl; 

  
  if (!token && pathname.startsWith("/dashboard")) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.url); 
    return NextResponse.redirect(loginUrl);
  }

  
  return NextResponse.next();
}


export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"]
};
