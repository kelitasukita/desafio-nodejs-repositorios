const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title, 
    url,
    techs,
    likes: 0
  }

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const indexToBeUpdated = repositories.findIndex((repository) => {
    return repository.id === id;
  });

  if(indexToBeUpdated === -1) {
    return response.status(400).json();
  }

  const itemToBeUpdated = repositories[indexToBeUpdated];

  itemToBeUpdated.title = title;
  itemToBeUpdated.url = url;
  itemToBeUpdated.techs = techs;

  repositories[indexToBeUpdated] = itemToBeUpdated;

  return response.json(itemToBeUpdated);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const indexToBeRemoved = repositories.findIndex((repository) => {
    return repository.id === id;
  });

  if(indexToBeRemoved === -1) {
    return response.status(400).json();
  }

  repositories.splice(indexToBeRemoved, 1);

  return response.status(204).json();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find(repository => repository.id === id);

  if(!repository) {
    return response.status(400).json();
  }

  repository.likes += 1;

  return response.json(repository);
});

module.exports = app;
