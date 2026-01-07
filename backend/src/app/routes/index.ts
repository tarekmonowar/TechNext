import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { UrlRoutes } from "../modules/urls/url.route";

export const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/url",
    route: UrlRoutes,
  },
];
// ---------------> All module routes registered here <--------------- //
moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
