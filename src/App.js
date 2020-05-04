import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepositories(response.data);
    });
  });

  async function handleAddRepository() {
    await api
      .post("/repositories", {
        title: "first aws cloud app",
        url: "https://github.com/ffrancis-reis/private-blockchain-application",
        techs: ["cloud", "aws", "app"],
      })
      .then((response) => {
        setRepositories([...repositories, response.data]);
      });
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`).then((response) => {
      if (response.status === 204) {
        setRepositories([
          ...repositories,
          repositories.filter((repo) => repo.id !== id),
        ]);
      }
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
