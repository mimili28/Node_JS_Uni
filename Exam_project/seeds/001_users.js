
exports.seed = function(knex) {
      return knex('users').insert([
        {username: 'user', password: 'password'},
      ]);
};