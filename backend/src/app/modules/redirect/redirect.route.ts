import { Router } from "express";
import { RedirectControllers } from "./redirect.controller";
const router = Router();

router.get("/:shortCode", RedirectControllers.redirectToOriginal);

export const RedirectRoutes = router;
