import { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../context/AppContext";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import "./Dashboard.css";

function Dashboard() {
  const { user } = useContext(AppContext);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true);
      setError("");

      try {
        const [postsRes, usersRes] = await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/posts?_limit=6"),
          fetch("https://jsonplaceholder.typicode.com/users?_limit=4"),
        ]);

        if (!postsRes.ok || !usersRes.ok) {
          throw new Error("Failed to load dashboard data.");
        }

        const postsData = await postsRes.json();
        const usersData = await usersRes.json();
        setPosts(postsData);
        setUsers(usersData);
      } catch (fetchError) {
        setError(fetchError.message || "Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const dashboardSummary = useMemo(
    () => ({
      totalPosts: posts.length,
      totalUsers: users.length,
      recentPost: posts[0]?.title || "No posts available yet.",
      recentUser: users[0]?.name || "No users loaded yet.",
    }),
    [posts, users]
  );

  const topPosts = useMemo(
    () => posts.slice(0, 4),
    [posts]
  );

  if (loading) {
    return (
      <main className="dashboard-page">
        <Loader />
      </main>
    );
  }

  if (error) {
    return (
      <main className="dashboard-page">
        <ErrorMessage message={error} />
      </main>
    );
  }

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div className="dashboard-title">
          <p className="dashboard-badge">Today</p>
          <h1>Welcome back{user?.name ? `, ${user.name}` : ""}.</h1>
          <p>Everything is ready for review — live metrics and team data are on watch.</p>
        </div>
      </header>

      <section className="dashboard-widgets">
        <article className="dashboard-card">
          <span>Total Posts</span>
          <strong>{dashboardSummary.totalPosts}</strong>
        </article>
        <article className="dashboard-card">
          <span>Connected Users</span>
          <strong>{dashboardSummary.totalUsers}</strong>
        </article>
        <article className="dashboard-card">
          <span>Latest Post</span>
          <strong>{dashboardSummary.recentPost}</strong>
        </article>
        <article className="dashboard-card">
          <span>Latest User</span>
          <strong>{dashboardSummary.recentUser}</strong>
        </article>
      </section>

      <section className="dashboard-table-section">
        <div className="table-header">
          <h2>Recent Content</h2>
          <p>Latest posts from the mock API.</p>
        </div>

        <div className="dashboard-table-wrapper">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Summary</th>
              </tr>
            </thead>
            <tbody>
              {topPosts.map((post) => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>{post.body.slice(0, 70)}...</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;

