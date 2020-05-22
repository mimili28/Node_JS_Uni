const {Model} = require('objection');

const User = require('./User.js');

class Role extends Model{
    static tableName = 'roles';

    //same as above
    // static get tableName(){
    //     return 'users';
    // }

    static relationMappings = {
        role: { //the key that is the name for the relation
            relation: Model.HasManyRelation,
            modelClass: User,
            join: {
                from: 'roles.id',
                to: 'users.roleId'
            }
        }
    };

}

module.exports = Role;