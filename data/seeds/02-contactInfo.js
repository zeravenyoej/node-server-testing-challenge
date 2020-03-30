
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('contactInfo').del()
    .then(function () {
      // Inserts seed entries
      return knex('contactInfo').insert([
        {email: 'josephnevarez12@gmail.com', phoneNumber:4083686451, user_id: 1},
        {email: 'davidnevarez@gmail.com', phoneNumber:4081234567, user_id: 2},
        {email: 'diananevarez@gmail.com', phoneNumber: 9161234567, user_id: 3},
      ]);
    });
};
