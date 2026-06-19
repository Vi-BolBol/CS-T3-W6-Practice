//
//  This repository shall:
//  - Connect to the database (using the pool provided by the database.js)
// -  Perfrom the SQL querries to implement the bellow API
//
import { pool } from "../utils/database.js"

// Get all articles
export async function getArticles() {
    const sql = `
        SELECT articles.*, 
        GROUP_CONCAT(categories.name) as category_names
        FROM articles
        LEFT JOIN article_categories ON articles.id = article_categories.article_id
        LEFT JOIN categories ON article_categories.category_id = categories.id
        GROUP BY articles.id`
    const [rows] = await pool.query(sql);
    return rows;
}

// Get article by ID
export async function getArticleById(id) {
    const sql = `
        SELECT articles.*, journalists.name as journalist_name 
        FROM articles 
        LEFT JOIN journalists ON articles.journalist_id = journalists.id 
        WHERE articles.id = ?`
    const [rows] = await pool.query(sql, [id])
    return rows[0] || null
}

// Create a new article
export async function createArticle(article) {
    // TODO
    const {title, content, journalist, category} = article
    const sql = `insert into articles (title, content, journalist, category) values(?, ?, ?, ?)`
    const [rows] = await pool.query(sql,[title, content, journalist, category])
    return { id: rows.insertId, ...article}
}

// Update an article by ID
export async function updateArticle(id, updatedData) {
    // TODO
    const {title, content, journalist, category} = updatedData
    const sql = `update articles set title = ?, content = ?, journalist = ?, category = ? where id = ?`
    const [rows] = await pool.query(sql,[title, content, journalist, category, id])
    return { id, ...updatedData}
}

// Delete an article by ID
export async function deleteArticle(id) {
    // TODO
    const sql = `delete from articles where id = ?`
    const [rows] = await pool.query(sql, [id])
    return { id }
}
