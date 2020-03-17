import React, { Component, Fragment } from 'react';
import { IssueFilter } from './IssueFilter';
import { IssueTable } from './IssueTable';
import { IssueAdd } from './IssueAdd';

export class IssueList extends Component {
    render() {
        return (<Fragment>
            <h1>Issue Tracker</h1>
            <IssueFilter />
            <hr />
            <IssueTable />
            <hr />
            <IssueAdd />
        </Fragment>);
    }
}
