import React, { Component } from 'react';
import { IssueRow } from './IssueRow';

export class IssueTable extends Component {
    constructor() {
        this.super()
        this.state = { issues = initialIssues }
    }

    render() {
        const initialIssues = [
            {
                id: 1, status: 'New', owner: 'Ravan', effort: 5,
                created: new Date('2018-08-15'), due: undefined,
                title: 'Error in console when clicking Add',
            },
            {
                id: 2, status: 'Assigned', owner: 'Eddie', effort: 14,
                created: new Date('2018-08-16'), due: new Date('2018-08-30'),
                title: 'Missing bottom border on panel',
            },
        ];

        const issueRows = this.state.issues.map(issue => <IssueRow key={issue.id} issue={issue} />);

        return (<table className="table">
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
            <tbody>
                {issueRows}
            </tbody>
        </table>);
    }
}
