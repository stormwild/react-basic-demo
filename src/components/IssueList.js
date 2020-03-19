import React, { Component } from 'react';
import IssueFilter from './IssueFilter';
import IssueTable from './IssueTable';
import IssueAdd from './IssueAdd';

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

    const result = await (
      await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      })
    ).json();
    console.log(result.data);
    this.setState({ issues: result.data.issueList });
  }

  createIssue(issue) {
    this.setState(state => {
      const { issues } = state;
      issues.push(issue);
      return { issues };
    });
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
