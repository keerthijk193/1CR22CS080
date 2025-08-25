// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import AddUser from "./AddUser";
// import SearchUsers from "./SearchUsers";

// function App() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get("https://jsonplaceholder.typicode.com/users")
//       .then(res => {
//         setUsers(res.data);
//         setLoading(false);
//       })
//       .catch(err => setLoading(false));
//   }, []);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Users List</h1>
//       <SearchUsers users={users} />
//       <AddUser users={users} setUsers={setUsers} />
//     </div>
//   );
// }

// export default App;
// ready

import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [editingUser, setEditingUser] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [darkMode, setDarkMode] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Fetch users
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch users");
        setLoading(false);
      });
  }, []);

  // Add User
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return;
    const tempUser = { id: Date.now(), ...newUser };
    setUsers([tempUser, ...users]);
    setNewUser({ name: "", email: "" });
  };

  // Edit User
  const handleEditUser = (user) => setEditingUser(user);

  const handleUpdateUser = () => {
    setUsers(
      users.map((u) => (u.id === editingUser.id ? editingUser : u))
    );
    setEditingUser(null);
  };

  // Delete User (with confirm)
  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  // Search + Sort
  const filteredUsers = users
    .filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      a[sortBy].toLowerCase().localeCompare(b[sortBy].toLowerCase())
    );

  // Pagination Logic
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      backgroundImage: "url('/user.png')",  // background image from public folder
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    }}
  >
    {/* Overlay so text is visible */}
    <div
      style={{
        backgroundColor: darkMode ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.7)",
        color: darkMode ? "#fff" : "#000",
        flex: 1,
        padding: "20px",
      }}
    >
      <h1>User Management System</h1>

      {/* Controls */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* Add User */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>

      {/* Search & Sort */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="email">Sort by Email</option>
        </select>
      </div>

      {/* Loading & Error */}
      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* User List */}
      {!loading &&
        !error &&
        currentUsers.map((user) => (
          <div
            key={user.id}
            style={{
              padding: "10px",
              margin: "10px 0",
              border: "1px solid #ccc",
              borderRadius: "5px",
              background: darkMode ? "#333" : "#fff",
            }}
          >
            {editingUser && editingUser.id === user.id ? (
              <div>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, email: e.target.value })
                  }
                />
                <button onClick={handleUpdateUser}>Save</button>
                <button onClick={() => setEditingUser(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <strong>{user.name}</strong> - {user.email}
                <div>
                  <button onClick={() => handleEditUser(user)}>Edit</button>
                  <button onClick={() => handleDeleteUser(user.id)}>
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

      {/* Pagination */}
      <div style={{ marginTop: "20px" }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            style={{
              margin: "0 5px",
              background: currentPage === i + 1 ? "#007bff" : "#ccc",
              color: "#fff",
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  </div>
);
}


export default App;
