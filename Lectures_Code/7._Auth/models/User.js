const {Model} = require('objection');

const Role = require('./Role.js');

class User extends Model{
    static tableName = 'users';

    //same as above
    // static get tableName(){
    //     return 'users';
    // }

    static relationMappings = {
        role: { //the key that is the name for the relation
            relation: Model.BelongsToOneRelation,
            modelClass: Role,
            join: {
                from: 'users.roleId',
                to: 'roles.id'
            }
        }
    };

}

module.exports = User;