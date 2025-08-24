import React, { useState } from "react";
import axios from "axios";

function AddUser({ users, setUsers }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { name, email };

    axios.post("https://jsonplaceholder.typicode.com/users", newUser)
      .then(res => {
        alert(`User added: ${res.data.name}`);
        setUsers([...users, res.data]);
        setName("");
        setEmail("");
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <button type="submit">Add User</button>
    </form>
  );
}

export default AddUser;
