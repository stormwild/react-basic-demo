const fs = require('fs');
const path = require('path');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

let aboutMessage = 'Issue Tracker API v1.0';

const issuesDB = [
  {
    id: 1,
    status: 'New',
    owner: 'Ravan',
    effort: 5,
    created: new Date('2019-01-15').toISOString(),
    due: undefined,
    title: 'Error in console when clicking Add',
  },
  {
    id: 2,
    status: 'Assigned',
    owner: 'Eddie',
    effort: 14,
    created: new Date('2019-01-16').toISOString(),
    due: new Date('2019-02-01').toISOString(),
    title: 'Missing bottom border on panel',
  },
];

const setAboutMessage = (_, { message }) => {
  return (aboutMessage = message);
};

const resolvers = {
  Query: {
    about: () => aboutMessage,
    issueList: () => issuesDB,
  },
  Mutation: {
    setAboutMessage,
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync('schema/schema.gql', 'utf-8'),
  resolvers,
});

const app = express();
const port = 3000;

app.use(express.static('public'));

server.applyMiddleware({ app, path: '/graphql' });

app.listen(port, () => {
  console.log(`App started: http://localhost:${port}`);
});
