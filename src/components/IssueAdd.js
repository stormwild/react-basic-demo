import React, { Component } from 'react';

class IssueAdd extends Component {
  componentDidMount() {
    console.log(this.props);
    const { createIssue } = this.props;
    setTimeout(() => {
      createIssue();
    }, 2000);
  }

  render() {
    return (
      <form className="form">
        <input type="text" name="owner" placeholder="Owner" />
        <input type="text" name="title" placeholder="Title" />
        <button type="submit">Add</button>
      </form>
    );
  }
}

export default IssueAdd;
