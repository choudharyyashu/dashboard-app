import { useCallback, useEffect, useMemo, useState } from "react";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import "./Users.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!response.ok) {
        throw new Error("Unable to load users at the moment.");
      }

      const data = await response.json();
      setUsers(data);
    } catch (fetchError) {
      setError(fetchError.message || "Failed to fetch user list.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const userRows = useMemo(
    () =>
      users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        company: user.company.name,
        city: user.address.city,
      })),
    [users]
  );

  if (loading) {
    return (
      <main className="users-page">
        <Loader />
      </main>
    );
  }

  if (error) {
    return (
      <main className="users-page">
        <ErrorMessage message={error} />
      </main>
    );
  }

  return (
    <main className="users-page">
      <header className="users-header">
        <div>
          <h1>Team Directory</h1>
          <p>Dynamic user data pulled from JSONPlaceholder.</p>
        </div>
        <button onClick={fetchUsers} className="refresh-button">
          Refresh
        </button>
      </header>

      <section className="users-table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {userRows.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.company}</td>
                <td>{row.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default Users;
