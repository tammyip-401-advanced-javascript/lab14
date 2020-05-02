'use strict';

require('@code-fellows/supergoose');

const Users = require('../lib/models/users-schema');

/* 
{
  username: { type: 'String', required: true, unique: true },
  password: { type: 'String', required: true },
  email: { type: 'String' },
  role: {type: 'String', required: true, default: 'user', enum: ['admin', 'editor', 'user']}
}
*/

describe('users model', () => {
  let users;

  beforeEach(() => {
    users = new Users();
  });

  it('can create a new user', async () => {
    const newUser = {
      username: 'Mary',
      password: 'Mary123',
      email: 'mary@hotmail.com',
      role: 'user',
    };
    const record = await users.create(newUser);

    Object.keys(newUser).forEach(key => {
      expect(newUser[key]).toEqual(record[key]);
    });
  });


  it('can read a single user', async () => {
    const newUser = {
      username: 'Mary',
      password: 'Mary123',
      email: 'mary@hotmail.com',
      role: 'user',
    };
    const userCreated = await users.create(newUser);
    const readEntry = await users.read(userCreated._id);
    Object.keys(newUser).forEach(key => {
      expect(newUser[key]).toEqual(readEntry[0][key]);
    });
  });


  it('can read all users', async () => {
    const newUser = {
      username: 'Mary',
      password: 'Mary123',
      email: 'mary@hotmail.com',
      role: 'user',
    };
    const secondUser = {
      username: 'Paul',
      password: 'Paul123',
      email: 'paul@hotmail.com',
      role: 'user',
    };
    await users.create(newUser);
    await users.create(secondUser);
    const readEntries = await users.read();
    expect(readEntries.length > 2).toBeTruthy();
  });

  it('can delete an user', async () => {
    const newUser = {
      username: 'Mary',
      password: 'Mary123',
      email: 'mary@hotmail.com',
      role: 'user',
    };
    const userCreated = await users.create(newUser);

    await users.delete(userCreated._id);
    const readDeletedEntry = await users.read(userCreated._id);

    expect(readDeletedEntry).toEqual([]);

  });

  it('can update an user', async () => {
    const newUser = {
      username: 'Mary',
      password: 'Mary123',
      email: 'mary@hotmail.com',
      role: 'user',
    };

    const updatedInfo = {
      username: 'Mary',
      password: 'Mary123',
      email: 'mary333@hotmail.com',
      role: 'user',
    };

    const userCreated = await users.create(newUser);
    const updatedInfo = await users.update(userCreated._id, updatedInfo);
    Object.keys(updatedInfo).forEach(key => {
      expect(updatedInfo[key]).toEqual(updatedProduct[key]);
    });
  });
});