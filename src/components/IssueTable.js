import React from 'react';
import IssueRow from './IssueRow';

const IssueTable = ({ issues }) => {
  const issueRows = issues ? issues.map(issue => <IssueRow key={issue.id} issue={issue} />) : [];

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Status</th>
          <th>Owner</th>
          <th>Created</th>
          <th>Effort</th>
          <th>Due Date</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>{issueRows}</tbody>
    </table>
  );
};

export default IssueTable;
