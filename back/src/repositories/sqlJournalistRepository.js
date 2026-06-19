import { pool } from "../utils/database.js";

// Get all articles by journalist ID (with journalist info)
export async function getArticlesByJournalistId(journalistId) {
    const sql = `
        SELECT articles.* 
        FROM articles 
        JOIN journalists ON articles.journalist_id = journalists.id 
        WHERE journalists.id = ?`
    const [rows] = await pool.query(sql, [journalistId])
    return rows
}

// Get all journalists
export async function getJournalists() {
    const [rows] = await pool.query("SELECT * FROM journalists")
    return rows
}

// Get journalist by ID
export async function getJournalistById(id) {
    const [rows] = await pool.query("SELECT * FROM journalists WHERE id = ?", [id])
    return rows[0] || null
}