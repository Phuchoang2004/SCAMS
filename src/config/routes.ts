export const ROUTES = {
  // Auth routes
  LOGIN: "/login",

  // Protected routes
  HOME: "/",
  ROOM_DETAILS: "/room/:id/details",
  ROOM_BOOKING: "/room/:id/booking",
  ROOM_MANAGE: "/room/:id/manage",
  BOOKING: "/booking",

  // Fallback
  NOT_FOUND: "/404",
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
