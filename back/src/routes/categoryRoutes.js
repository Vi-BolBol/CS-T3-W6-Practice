import { Router } from "express";
import { getAllCategories, getArticlesByCategory } from "../controllers/categoryController.js";

const categoryRouter = Router();
categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id/articles", getArticlesByCategory);

export default categoryRouter;