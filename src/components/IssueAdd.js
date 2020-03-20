import React, { Component } from 'react';

class IssueAdd extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.issueAdd;
    const { createIssue } = this.props;

    const issue = {
      owner: form.owner.value,
      title: form.title.value,
      effort: parseInt(form.effort.value, 10),
      due: new Date(form.due.value),
      status: form.status.value,
    };

    createIssue(issue);

    form.owner.value = '';
    form.title.value = '';
    form.due.value = '';
  }

  render() {
    return (
      <form className="form" name="issueAdd" onSubmit={this.handleSubmit}>
        <input type="text" name="owner" placeholder="Owner" />
        <input type="text" name="title" placeholder="Title" />
        <input type="number" name="effort" placeholder="Effort" />
        <input type="date" name="due" placeholder="Due" />
        <select name="status">
          <option value="New">New</option>
          <option value="Assigned">Assigned</option>
          <option value="Fixed">Fixed</option>
          <option value="Closed">Closed</option>
        </select>
        <button type="submit">Add</button>
      </form>
    );
  }
}

export default IssueAdd;
