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

    const response = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const body = await response.text();
    const result = JSON.parse(body, reviver);

    this.setState({ issues: result.data.issueList });
  }

  async createIssue(issue) {
    const query = `
      mutation addIssue($issue: IssueInputs!) {
        addIssue(issue: $issue) {
          id
        }
      }
    `;

    await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { issue } }),
    });

    this.loadData();
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
