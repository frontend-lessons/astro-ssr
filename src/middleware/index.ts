import { sequence } from "astro:middleware";
import { AuthMiddleware } from "./auth";
import { RoutesMiddleware } from "./routes";

export const onRequest = sequence(RoutesMiddleware, AuthMiddleware);