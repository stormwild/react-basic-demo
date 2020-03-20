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
    const dateValue = new Date(value);
    return isNaN(dateValue) ? undefined : dateValue;
  },
  parseLiteral(ast) {
    if (ast.kind == Kind.STRING) {
      const value = new Date(ast.value);
      return isNaN(value) ? undefined : value;
    }
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

const validateIssue = (_, { issue }) => {
  console.log(_, issue);
  const errors = [];
  if (issue.title.length < 3) {
    errors.push('Field "title" must be at least 3 characters');
  }

  if (issue.status === 'Assigned' && !issue.owner) {
    errors.push('Field "owner" required if status is "Assigned"');
  }

  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
};

const addIssue = (_, { issue }) => {
  validateIssue(_, { issue: issue });
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
  formatError: error => {
    console.log(JSON.stringify(error));
    return error;
  },
});

const app = express();
const port = 3000;

app.use(express.static('public'));

server.applyMiddleware({ app, path: '/graphql' });

app.listen(port, () => {
  console.log(`App started: http://localhost:${port}`);
});
