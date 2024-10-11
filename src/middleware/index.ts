import { sequence } from "astro:middleware";
import { AuthMiddleware } from "./auth";
import { ResponseMiddleware } from "./response";
import { RoutesMiddleware } from "./routes";

export const onRequest = sequence(RoutesMiddleware, AuthMiddleware, ResponseMiddleware);