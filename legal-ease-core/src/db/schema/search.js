import { DataTypes } from 'sequelize';
import db from '../config.js';

const Search = db.define('Search', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    query: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    deleted_at: {
        type: DataTypes.DATE,
        defaultValue: null,
    },
    }, {
    timestamps: false,
    tableName: 'searches',
    });

export default Search;