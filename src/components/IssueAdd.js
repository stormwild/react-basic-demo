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
      effort: form.effort.value,
      due: new Date(form.due.value),
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
        <button type="submit">Add</button>
      </form>
    );
  }
}

export default IssueAdd;
