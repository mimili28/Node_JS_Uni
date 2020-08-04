
exports.up = function(knex) {
    return knex.schema
    .createTable('users', (table) => {
        table.increments('id').notNullable();
        table.string('username').unique().notNullable();
        table.string('password').notNullable();
        table.integer('age');
        table.string('profile_img');
    })
    .createTable('photos', table => {
        table.increments('id').notNullable();
        table.string('filename');
        table.string('description');
        table.string('tags');
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('users.id');
    });
  
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('photos')
    .dropTableIfExists('users')
};
