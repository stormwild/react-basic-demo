import React, { Component } from 'react';
import IssueFilter from './IssueFilter';
import IssueTable from './IssueTable';
import IssueAdd from './IssueAdd';

class IssueList extends Component {
  constructor() {
    super();
    this.initialIssues = [
      {
        id: 1,
        status: 'New',
        owner: 'Ravan',
        effort: 5,
        created: new Date('2018-08-15'),
        due: undefined,
        title: 'Error in console when clicking Add',
      },
      {
        id: 2,
        status: 'Assigned',
        owner: 'Eddie',
        effort: 14,
        created: new Date('2018-08-16'),
        due: new Date('2018-08-30'),
        title: 'Missing bottom border on panel',
      },
    ];

    this.state = { issues: this.initialIssues };
    this.createIssue = this.createIssue.bind(this);
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
