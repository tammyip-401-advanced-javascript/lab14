'use strict';

const supergoose = require('@code-fellows/supergoose');
const serverObj = require('../lib/server.js');

// create our mock server from the imported server
const mockRequest = supergoose(serverObj.server);

// Database is set up? Not needed!

describe('happy path', () => {
  it('can create a user', async () => {
    // post to /signup
    // send username, password, (fname, lname)

    let response = await mockRequest.post('/signup-body').send({
      username: 'bUser',
      password: 'bPass',
      fname: 'Bill',
      lname: 'Biggs',
    });

    // check the response

    // it should have the right status (201)
    expect(response.status).toBe(201);

    // this new record should have an _id
    expect(response.body._id).toBeDefined();

    // this new record should have a password created that doesn't match 'bPass'
    expect(response.body.password).toBeDefined();
    expect(response.body.password).not.toBe('bPass');
  });

  it('can signin a user', async () => {
    let response = await mockRequest
      .post('/signin')
      .set('Authorization', 'Basic YlVzZXI6YlBhc3M=');

    // check the response

    // it should have the right status (200)
    expect(response.status).toBe(200);

    // it should show the user record of who was signed in
    expect(response.body.username).toBe('bUser');
    expect(response.body.fname).toBe('Bill');
    expect(response.body.lname).toBe('Biggs');
  });
});