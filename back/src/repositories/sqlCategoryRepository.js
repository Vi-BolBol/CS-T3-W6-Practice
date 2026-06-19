import { pool } from "../utils/database.js";

// Get all categories
export async function getCategories() {
    const [rows] = await pool.query("SELECT * FROM categories");
    return rows;
}

// Get all articles by category ID
export async function getArticlesByCategoryId(categoryId) {
    const sql = `
        SELECT articles.*, categories.name as category_name
        FROM articles
        JOIN article_categories ON articles.id = article_categories.article_id
        JOIN categories ON article_categories.category_id = categories.id
        WHERE categories.id = ?`
    const [rows] = await pool.query(sql, [categoryId]);
    return rows;
}

// Get categories by article ID
export async function getCategoriesByArticleId(articleId) {
    const sql = `
        SELECT categories.*
        FROM categories
        JOIN article_categories ON categories.id = article_categories.category_id
        WHERE article_categories.article_id = ?`
    const [rows] = await pool.query(sql, [articleId]);
    return rows;
}