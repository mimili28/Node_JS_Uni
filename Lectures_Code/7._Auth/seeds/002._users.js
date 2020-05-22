
exports.seed = function(knex) {
  return knex('roles').select().then(roles => {
    return knex('users').insert([   
      { username: 'admin', password: "$2b$12$Pkk0lkSayiQSJU6/pD0oVeh2pWzFtpyZPPGUwRdE.XsZZPtSXcdOq", role_id: roles.find(role => role.role === 'ADMIN').id },
    ]);
  });
};
