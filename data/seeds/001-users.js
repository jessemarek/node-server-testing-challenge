
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'ls2003',
          password: 'plainText'
        },
        {
          username: 'starlord',
          password: 'qwerty'
        },
        {
          username: 'vader99',
          password: 'password'
        },
        {
          username: 'teh_hitman',
          password: 'oneshot'
        }
      ]);
    });
};
