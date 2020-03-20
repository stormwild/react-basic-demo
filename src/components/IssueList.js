import React, { Component } from 'react';
import IssueFilter from './IssueFilter';
import IssueTable from './IssueTable';
import IssueAdd from './IssueAdd';
import reviver from '../utils/helpers';

class IssueList extends Component {
  constructor() {
    super();
    this.state = { issues: [] };
    this.createIssue = this.createIssue.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
                    issueList {
                      id
                      status
                      title
                      effort
                      owner
                      created
                      due
                    }
                  }`;
    const data = await this.graphQLFetch(query);
    if (data) {
      this.setState({ issues: data.issueList });
    }
  }

  async createIssue(issue) {
    const query = `
      mutation addIssue($issue: IssueInputs!) {
        addIssue(issue: $issue) {
          id
        }
      }
    `;

    const data = await this.graphQLFetch(query, { issue });
    if (data) {
      this.loadData();
    }
  }

  /* eslint-disable-next-line class-methods-use-this */
  async graphQLFetch(query, variables = {}) {
    try {
      const response = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
      });
      const body = await response.text();
      const result = JSON.parse(body, reviver);
      if (result.errors) {
        const error = result.errors[0];
        if (error.extensions.code === 'BAD_USER_INPUT') {
          const details = error.extensions.exception.errors.join('\n ');
          alert(`${error.message}:\n ${details}`);
        } else {
          alert(`${error.extensions.code}: ${error.message}`);
        }
      }
      return result.data;
    } catch (e) {
      alert(`Error in sending data to server: ${e.message}`);
    }
    return undefined;
  }

  render() {
    const { issues } = this.state;

    return (
      <>
        <h1>Issue Tracker</h1>
        <IssueFilter />
        <hr />
        <IssueTable issues={issues} />
        <hr />
        <IssueAdd createIssue={this.createIssue} issues={issues} />
      </>
    );
  }
}

export default IssueList;
