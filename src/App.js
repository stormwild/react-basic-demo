import React from 'react'
import ReactDOM from 'react-dom'

const App = () => (
    <div title="Outer div">
        <h1>Hello World!</h1>
    </div>
);

ReactDOM.render(<App />, document.getElementById('content'));