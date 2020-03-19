const fs = require('fs');
const path = require('path');
const express = require('express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { ApolloServer } = require('apollo-server-express');

const GraphQLDate = new GraphQLScalarType({
  name: 'GraphQLDate',
  description: 'A Date() type in GraphQL as a scalar',
  serialize(value) {
    return value.toISOString();
  },
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    return ast.kind == Kind.STRING ? new Date(ast.value) : undefined;
  },
});

let aboutMessage = 'Issue Tracker API v1.0';

const issuesDB = [
  {
    id: 1,
    status: 'New',
    owner: 'Ravan',
    effort: 5,
    created: new Date('2019-01-15'),
    due: undefined,
    title: 'Error in console when clicking Add',
  },
  {
    id: 2,
    status: 'Assigned',
    owner: 'Eddie',
    effort: 14,
    created: new Date('2019-01-16'),
    due: new Date('2019-02-01'),
    title: 'Missing bottom border on panel',
  },
];

const setAboutMessage = (_, { message }) => {
  return (aboutMessage = message);
};

const addIssue = (_, { issue }) => {
  issue.id = issuesDB.length + 1;
  issue.created = new Date();
  issue.status = issue.status || 'New';
  issuesDB.push(issue);
  return issue;
};

const resolvers = {
  Query: {
    about: () => aboutMessage,
    issueList: () => issuesDB,
  },
  Mutation: {
    setAboutMessage,
    addIssue,
  },
  GraphQLDate,
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
