const {Model} = require('objection');

const Photo = require('./Photo.js')

class User extends Model{
    static tableName = 'users';

    static relationMappings = {
        photos: {
            relation: Model.HasManyRelation,
            modelClass: Photo,
            join:{
                from: 'user.id',
                to: 'photos.userId'
            }
        }
    }
    
}
module.exports = User;