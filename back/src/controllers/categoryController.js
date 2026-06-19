import * as categoryRepository from "../repositories/sqlCategoryRepository.js";

// GET /api/categories
export async function getAllCategories(req, res) {
    try {
        const categories = await categoryRepository.getCategories();
        res.json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Server error" });
    }
}

// GET /api/categories/:id/articles
export async function getArticlesByCategory(req, res) {
    try {
        const articles = await categoryRepository.getArticlesByCategoryId(req.params.id);
        res.json(articles);
    } catch (error) {
        console.error("Error fetching articles by category:", error);
        res.status(500).json({ message: "Server error" });
    }
}