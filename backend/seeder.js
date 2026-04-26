require('dotenv').config();
const mongoose = require('mongoose');
const Lead = require('./models/Lead');
const User = require('./models/User');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/crm');
        console.log('Connected to DB...');

        // Clear existing data
        await Lead.deleteMany();
        await User.deleteMany();

        // Create Admin
        await User.create({
            username: 'admin',
            password: 'password123'
        });
        console.log('Admin created (admin / password123)');

        // Create Sample Leads
        const leads = [
            {
                name: 'Alice Johnson',
                email: 'alice@example.com',
                source: 'Google Ads',
                status: 'New',
                notes: [{ text: 'Expressed interest in the premium plan.' }]
            },
            {
                name: 'Bob Smith',
                email: 'bob@techcorp.io',
                source: 'Referral',
                status: 'Contacted',
                notes: [{ text: 'First call done. Sent the brochure.' }]
            },
            {
                name: 'Charlie Davis',
                email: 'charlie@startup.co',
                source: 'Website Form',
                status: 'Converted',
                notes: [{ text: 'Signed the contract today!' }]
            },
            {
                name: 'Diana Prince',
                email: 'diana@amazon.com',
                source: 'LinkedIn',
                status: 'New',
                notes: []
            }
        ];

        await Lead.insertMany(leads);
        console.log('Sample leads seeded.');

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
