const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost/issuetracker';

const client = new MongoClient(url);

client.connect((err, c) => {
  const db = c.db();
  const employees = db.collection('employees');

  // const employee = { id: 1, name: 'A. Callback', age: 23 };
  // employees.insertOne(employee, function(err, result) {
  //   console.log('Result of insert:\n', result.insertedId);
  // });

  employees.find().toArray((err, emp) => console.log('Result:\n', emp));

  c.close();
});

const testWithCallbacks = callback => {
  console.log('\n--- testWithCallbacks ---');
};
