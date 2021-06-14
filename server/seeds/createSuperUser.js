const bcrypt = require('bcrypt');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { name: 'Admin', email: 'admin@gmail.com', password: bcrypt.hashSync('12345678', parseInt(process.env.SALT_ROUND)) }
      ]);
    });
};
