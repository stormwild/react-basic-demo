import React from 'react';
import ReactDOM from 'react-dom';
import IssueList from './components/IssueList';

const App = () => (
  <div className="container">
    <IssueList />
  </div>
);

ReactDOM.render(<App />, document.getElementById('content'));
