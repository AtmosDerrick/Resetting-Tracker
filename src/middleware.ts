import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard/overview", "/dashboard/project"];

export default withAuth(
  function middleware(req: NextRequest) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isProtectedRoute = protectedRoutes.some((route) =>
          req.nextUrl.pathname.startsWith(route)
        );

        if (isProtectedRoute && !token) {
          return false;
        }

        return true;
      },
    },
    pages: {
      signIn: "/",
    },
  }
);
