const { Model } = require('objection');

const User = require('./User.js');

class Photo extends Model {
    static tableName = 'photos';

    static relationMappings = {
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
              from: 'photos.userId',
              to: 'users.id'
            }
        }
    }
}

module.exports = Photo;