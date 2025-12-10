export const ROUTES = {
  // Auth routes
  LOGIN: "/login",
  REGISTER: "/register",
  VERIFY_EMAIL: "/verify-email",

  // Protected routes
  HOME: "/",
  ROOM_DETAILS: "/room/:id/details",
  ROOM_BOOKING: "/room/:id/booking",
  ROOM_MANAGE: "/room/:id/manage",
  BOOKING: "/booking",
  MY_RESERVATIONS: "/my-reservations",
  MANAGEMENT: "/management",
  REPORT: "/report",

  // Fallback
  NOT_FOUND: "/404",
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
