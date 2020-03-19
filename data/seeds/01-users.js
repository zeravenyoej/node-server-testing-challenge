
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'joey', password: "iforgot123"},
        {username: 'david', password: "abc123"},
        {username: 'diana', password: "lucas2018"},
      ]);
    });
};
