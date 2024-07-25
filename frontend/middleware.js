import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request){

  const authToken = request.cookies.get("token")?.value;

  const loggedInUserNotAccessPaths = request.nextUrl.pathname === "/";

  if(loggedInUserNotAccessPaths){
    if(authToken){
      return NextResponse.redirect(new URL("/form", request.url), {
        headers: {
          'Cache-Control': 'no-store'
        }
      });
    }
  } else{
    if(!authToken){
      return NextResponse.redirect(new URL("/", request.url), {
        headers: {
          'Cache-Control': 'no-store'
        }
      });
    }
  }


}

export const config = {
  matcher : [
    "/",
    "/register",
    "/form",
    "/admin",
    "/coupon",
    "/deleteRecord",
    "/edit/:path*",
    "/delete/:path*",

  ]
}

