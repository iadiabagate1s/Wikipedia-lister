
import db from '../config.js';
import User from './user.js';
import Search from './search.js';


// Define relationships
User.hasMany(Search, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    as: 'searches',

}
);

Search.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    as: 'user',
});

export {
    User,
    Search,
    db
}