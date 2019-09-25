const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PanelSchema = new Schema({
    
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },

    parentId: {
        type: Schema.Types.ObjectId,
        ref: 'panels'
    },

    childIds: [
        {
            type: Schema.Types.ObjectId,
            ref: 'panels'
        }
    ],

    title: {
        type: String,
        required: true
    },

    panelText: {
        type: String
    },

    photoURL: {
        type: String
    }

});

const Panel = mongoose.model('panels', PanelSchema);
module.exports = Panel;