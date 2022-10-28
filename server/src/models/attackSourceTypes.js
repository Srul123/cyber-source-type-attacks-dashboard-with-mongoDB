const mongoose = require('mongoose');

const AttackSourceTypes  = new mongoose.Schema({
    date: {
        type: String,
        required: true,
        unique: true,
    },
    severity: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length < 2) {
                throw new Error('Invalid values');
            }
        }
    },
    type: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length < 2) {
                throw new Error('Invalid values');
            }
        }
    },
    sourceType: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length < 2) {
                throw new Error('Invalid values');
            }
        }
    },
    networkType: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length < 2) {
                throw new Error('Invalid values');
            }
        }
    }
}, {
    versionKey: false
})



module.exports = mongoose.model('AttackSourceTypes', AttackSourceTypes);


