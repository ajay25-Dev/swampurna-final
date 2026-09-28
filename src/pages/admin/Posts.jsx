import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminLayout from "./AdminLayout";
import { adminApi } from "../../lib/adminApi";

const FILTERS = ["", "published", "disabled"];

const Posts = () => {
  const [status, setStatus] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [expandedId, setExpandedId] = useState("");
  const [detailsMap, setDetailsMap] = useState({});
  const [detailsLoadingId, setDetailsLoadingId] = useState("");

  const loadItems = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await adminApi.getAdminPosts({ status, limit: 100, offset: 0 });
      setItems(res.data || []);
    } catch (err) {
      setError(err.message || "Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const toggleExpand = async (id) => {
    if (expandedId === id) {
      setExpandedId("");
      return;
    }
    setExpandedId(id);
    if (!detailsMap[id]) {
      setDetailsLoadingId(id);
      try {
        const res = await adminApi.getAdminPostDetail(id);
        setDetailsMap((prev) => ({ ...prev, [id]: res.data }));
      } catch (err) {
        setError(err.message || "Failed to load post details");
      } finally {
        setDetailsLoadingId("");
      }
    }
  };

  const handleStatusChange = async (id, nextStatus) => {
    setSavingId(id);
    setError("");
    setMessage("");
    try {
      await adminApi.updateAdminPostStatus(id, nextStatus);
      setMessage(nextStatus === "disabled" ? "Post disabled." : "Post enabled.");
      await loadItems();
    } catch (err) {
      setError(err.message || "Failed to update post");
    } finally {
      setSavingId("");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post permanently? This cannot be undone.")) return;
    setSavingId(id);
    setError("");
    setMessage("");
    try {
      await adminApi.deleteAdminPost(id);
      setMessage("Post deleted.");
      await loadItems();
    } catch (err) {
      setError(err.message || "Failed to delete post");
    } finally {
      setSavingId("");
    }
  };

  return (
    <AdminLayout>
      <Wrap>
        <div className="head">
          <div>
            <h1>Community Posts</h1>
            <p>Review posts created by app users, see their likes and comments, and disable posts that violate guidelines.</p>
          </div>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            {FILTERS.map((item) => (
              <option key={item || "all"} value={item}>
                {item || "all"}
              </option>
            ))}
          </select>
        </div>

        {error && <div className="err">{error}</div>}
        {message && <div className="ok">{message}</div>}

        {loading ? (
          <div className="card">Loading...</div>
        ) : items.length === 0 ? (
          <div className="card">No posts found.</div>
        ) : (
          <div className="list">
            {items.map((post) => {
              const isExpanded = expandedId === post.id;
              const detail = detailsMap[post.id];
              return (
                <article key={post.id} className="card">
                  <div className="row">
                    <h2>{post.title || "Untitled post"}</h2>
                    <span className={`badge ${post.status}`}>{post.status}</span>
                  </div>
                  {post.image_url && <img className="thumb" src={post.image_url} alt="" />}
                  <p className="content">{post.content}</p>
                  <div className="meta">
                    <span>by: {post.author?.email || "unknown"}</span>
                    <span>likes: {post.like_count}</span>
                    <span>comments: {post.comment_count}</span>
                    <span>{new Date(post.created_at).toLocaleString()}</span>
                  </div>
                  <div className="actions">
                    <button onClick={() => toggleExpand(post.id)}>
                      {isExpanded ? "Hide details" : "View likes & comments"}
                    </button>
                    {post.status === "published" ? (
                      <button
                        className="disable"
                        onClick={() => handleStatusChange(post.id, "disabled")}
                        disabled={savingId === post.id}
                      >
                        Disable
                      </button>
                    ) : (
                      <button
                        className="enable"
                        onClick={() => handleStatusChange(post.id, "published")}
                        disabled={savingId === post.id}
                      >
                        Enable
                      </button>
                    )}
                    <button
                      className="delete"
                      onClick={() => handleDelete(post.id)}
                      disabled={savingId === post.id}
                    >
                      Delete
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="detail">
                      {detailsLoadingId === post.id || !detail ? (
                        <p className="muted">Loading details...</p>
                      ) : (
                        <>
                          <div className="detail-col">
                            <h3>Likes ({detail.likes?.length || 0})</h3>
                            {(detail.likes || []).length === 0 ? (
                              <p className="muted">No likes yet.</p>
                            ) : (
                              <ul>
                                {detail.likes.map((like) => (
                                  <li key={like.user_id}>{like.user?.email || like.user_id}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                          <div className="detail-col">
                            <h3>Comments ({detail.comments?.length || 0})</h3>
                            {(detail.comments || []).length === 0 ? (
                              <p className="muted">No comments yet.</p>
                            ) : (
                              <ul>
                                {detail.comments.map((comment) => (
                                  <li key={comment.id}>
                                    <strong>{comment.author?.email || "unknown"}:</strong> {comment.content}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </Wrap>
    </AdminLayout>
  );
};

const Wrap = styled.div`
  .head {
    margin-bottom: var(--space-5);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
  }

  .head h1 {
    font-size: var(--text-3xl);
    margin-bottom: var(--space-2);
  }

  .head p {
    color: var(--color-dark-500);
  }

  select {
    border: 1px solid var(--color-dark-200);
    border-radius: var(--radius-lg);
    background: #fff;
    padding: var(--space-3) var(--space-4);
    min-width: 160px;
  }

  .ok,
  .err {
    margin-bottom: var(--space-3);
    font-size: var(--text-sm);
  }

  .ok {
    color: #166534;
  }

  .err {
    color: #dc2626;
  }

  .list {
    display: grid;
    gap: var(--space-4);
  }

  .card {
    background: #fff;
    border: 1px solid var(--color-dark-100);
    border-radius: var(--radius-2xl);
    padding: var(--space-5);
    box-shadow: var(--shadow-soft);
    display: grid;
    gap: var(--space-3);
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
  }

  .thumb {
    max-width: 240px;
    border-radius: var(--radius-lg);
  }

  .content {
    color: var(--color-dark-700);
    line-height: 1.6;
    white-space: pre-wrap;
  }

  .meta {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
    color: var(--color-dark-500);
    font-size: var(--text-sm);
  }

  .actions {
    display: flex;
    gap: var(--space-2);
    flex-wrap: wrap;
  }

  button {
    border-radius: var(--radius-full);
    background: var(--color-dark-100);
    padding: var(--space-2) var(--space-4);
  }

  .disable {
    background: #fee2e2;
    color: #991b1b;
  }

  .enable {
    background: #dcfce7;
    color: #166534;
  }

  .delete {
    background: #1f2937;
    color: #fff;
  }

  button[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .badge {
    display: inline-flex;
    border-radius: 999px;
    padding: 4px 10px;
    font-size: 0.75rem;
    text-transform: capitalize;
  }

  .badge.published {
    background: #dcfce7;
    color: #166534;
  }

  .badge.disabled {
    background: #fee2e2;
    color: #991b1b;
  }

  .detail {
    border-top: 1px solid var(--color-dark-100);
    padding-top: var(--space-3);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-4);
  }

  .detail-col h3 {
    font-size: var(--text-sm);
    margin-bottom: var(--space-2);
  }

  .detail-col ul {
    display: grid;
    gap: 6px;
    font-size: var(--text-sm);
    color: var(--color-dark-700);
  }

  .muted {
    color: var(--color-dark-500);
    font-size: var(--text-sm);
  }

  @media (max-width: 640px) {
    .detail {
      grid-template-columns: 1fr;
    }
  }
`;

export default Posts;
