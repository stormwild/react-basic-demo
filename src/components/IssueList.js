import React from 'react';
import IssueFilter from './IssueFilter';
import IssueTable from './IssueTable';
import IssueAdd from './IssueAdd';

const IssueList = () => (
  <>
    <h1>Issue Tracker</h1>
    <IssueFilter />
    <hr />
    <IssueTable />
    <hr />
    <IssueAdd />
  </>
);

export default IssueList;
