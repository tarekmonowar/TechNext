import { Router } from "express";
import { UrlControllers } from "./url.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";

const router = Router();

//Route api/v1/url
router.post(
  "/",
  checkAuth(...Object.values(Role)),
  UrlControllers.createShortUrl,
);

//Route api/v1/url/:id
router.delete(
  "/:id",
  checkAuth(...Object.values(Role)),
  UrlControllers.deleteShortUrl,
);

//Route api/v1/url (users)
router.get("/", checkAuth(...Object.values(Role)), UrlControllers.getUserUrls);

//Route api/v1/url/allUrls
router.get("/allUrls", checkAuth(Role.admin), UrlControllers.getAllUrls);

export const UrlRoutes = router;
