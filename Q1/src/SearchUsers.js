import React, { useState } from "react";

function SearchUsers({ users }) {
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Search users"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <ul>
        {filteredUsers.map(u => (
          <li key={u.id}>{u.name} - {u.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchUsers;
