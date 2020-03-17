import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'

class IssueFilter extends Component {
    render() {
        return (
            <div>This is a placeholder for the issue filter.</div>
        );
    }
}

class IssueRow extends Component {
    render() {
        const { issue } = this.props

        return (
            <tr>
                <td>{issue.id}</td>
                <td>{issue.status}</td>
                <td>{issue.owner}</td>
                <td>{issue.created.toDateString()}</td>
                <td>{issue.effort}</td>
                <td>{issue.due ? issue.due.toDateString() : ''}</td>
                <td>{issue.title}</td>
            </tr>
        )
    }
}

class IssueTable extends Component {
    render() {        
        const issues = [
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

        const issueRows = issues.map(issue => <IssueRow key={issue.id} issue={issue} />);

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
                <tbody>
                    {issueRows}
                </tbody>
            </table>
        );
    }
}
class IssueAdd extends Component {
    render() {
        return (
            <div>This is a placeholder for a form to add an issue.</div>
        );
    }
}
class IssueList extends Component {
    render() {
        return (
            <Fragment>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable />
                <hr />
                <IssueAdd />
            </Fragment>
        );
    }
}
const element = <IssueList />;

const App = () => (
    <div className="container">
        <IssueList />
    </div>
);

ReactDOM.render(<App />, document.getElementById('content'));