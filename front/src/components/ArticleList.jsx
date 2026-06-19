import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getArticles, removeArticle } from "../services/api";
import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  const fetchArticles = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getArticles();
      setArticles(data);
    } catch (err) {
      setError("Failed to load articles. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories`);
      setCategories(response.data);
    } catch (err) {
      console.error("Failed to load categories");
    }
  };

  const fetchArticlesByCategory = async (categoryId) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.get(`${API_BASE_URL}/categories/${categoryId}/articles`);
      setArticles(response.data);
    } catch (err) {
      setError("Failed to load articles by category.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryToggle = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
      if (selectedCategories.length === 1) fetchArticles();
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
      fetchArticlesByCategory(categoryId);
    }
  };

  const deleteArticle = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      await removeArticle(id);
      await fetchArticles();
    } catch (err) {
      setError("Failed to delete article.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginBottom: "1rem" }}>
        <strong>Filter by category:</strong>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryToggle(cat.id)}
              style={{
                padding: "0.3rem 0.8rem",
                borderRadius: "20px",
                border: "1px solid #ccc",
                background: selectedCategories.includes(cat.id) ? "#333" : "#fff",
                color: selectedCategories.includes(cat.id) ? "#fff" : "#333",
                cursor: "pointer"
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="article-list">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            onView={(id) => navigate(`/articles/${id}`)}
            onEdit={(id) => navigate(`/articles/${id}/edit`)}
            onDelete={deleteArticle}
          />
        ))}
      </div>
    </>
  );
}

function ArticleCard({ article, onView, onEdit, onDelete }) {
  return (
    <div className="article-card">
      <div className="article-title">{article.title}</div>
      <div className="article-author">By {article.journalist_id}</div>
      {article.category_names && (
        <div style={{ fontSize: "0.8rem", color: "#666" }}>
          Categories: {article.category_names}
        </div>
      )}
      <div className="article-actions">
        <button className="button-tertiary" onClick={() => onEdit(article.id)}>Edit</button>
        <button className="button-tertiary" onClick={() => onDelete(article.id)}>Delete</button>
        <button className="button-secondary" onClick={() => onView(article.id)}>View</button>
      </div>
    </div>
  );
}