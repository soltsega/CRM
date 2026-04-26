const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    source: {
        type: String,
        default: 'Website Form'
    },
    status: {
        type: String,
        enum: ['New', 'Contacted', 'Converted'],
        default: 'New'
    },
    notes: [
        {
            text: String,
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('Lead', LeadSchema);
