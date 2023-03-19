import React, { useEffect, useState } from "react";
import "../styles/App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortAscending, setSortAscending] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      fetch("https://content.newtonschool.co/v1/pr/main/users")
        .then((res) => res.json())
        .then((data) =>
          setUsers(
            data.map((user) => ({
              id: user.id,
              name: user.name,
              email: user.email,
            }))
          )
        );
      setIsLoading(false);
    };
    fetchData();
  }, []);
  const handleSort = () => {
    setIsAscending(!isAscending);
    setUsers(
      users.sort((a, b) => {
        const nameA = a.name.length;
        const nameB = b.name.length;
        if (isAscending) {
          return nameA - nameB;
        } else {
          return nameB - nameA;
        }
      })
    );
  };

  return (
    <div id="main">
      <h2>User List</h2>

      <button className="fetch-data-btn" onClick={() => setUsers([])}>
        Fetch User Data
      </button>
      <button className="sort-btn" onClick={handleSort}>
        {sortAscending
          ? "Sort by name length (ascending)"
          : "Sort by name length (descending)"}
      </button>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="users-section">
          {users.map((user) => {
            return (
              <li key={index}>
                <section className="id-section">{user.id}</section>
                <section className="name-email-section">
                  <p className="name">Name:{user.name}</p>
                  <p className="email">Email:{user.email}</p>
                </section>
              </li>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default App;
