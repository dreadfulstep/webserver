export const StatusCodes = {
  INVALID_ROUTE: {
    code: "INVALID_ROUTE",
    error: "The route is invalid.",
  },
  UNAUTHORIZED: {
    code: "UNAUTHORIZED",
    error: "You are not authorized to access this resource.",
  },
  INTERNAL_SERVER_ERROR: {
    code: "INTERNAL_SERVER_ERROR",
    error: "An internal server error occurred.",
  },
  FORBIDDEN: {
    code: "FORBIDDEN",
    error: "You can't access this route."
  },
  CODE_MISSING: {
    code: "CODE_MISSING",
    error: "The 'code' parameter is missing."
  },
  INVALID_CODE: {
    code: "INVALID_CODE",
    error: "Your code provided by discord is invalid."
  },
  INVALID_CREDENTIALS: {
    code: "INVALID_CREDENTIALS",
    error: "App Credentials are invalid, contact a developer."
  },
  UNAUTHORIZED_REQUEST: {
    code: "UNAUTHORIZED_REQUEST",
    error: "This request is unauthorized."
  },
  DISCORD_ERROR: {
    code: "DISCORD_ERROR",
    error: "A discord error has occured."
  }
} as const;

export type StatusCodeKey = keyof typeof StatusCodes;
export type StatusCode = typeof StatusCodes[StatusCodeKey];