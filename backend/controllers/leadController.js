const Lead = require('../models/Lead');

// @desc    Create a new lead
// @route   POST /api/leads
// @access  Public (usually)
exports.createLead = async (req, res) => {
    try {
        const lead = await Lead.create(req.body);
        res.status(201).json({ success: true, data: lead });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get all leads
// @route   GET /api/leads
// @access  Private (Admin)
exports.getLeads = async (req, res) => {
    try {
        const leads = await Lead.find().sort('-createdAt');
        res.status(200).json({ success: true, count: leads.length, data: leads });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Update lead status
// @route   PATCH /api/leads/:id/status
// @access  Private (Admin)
exports.updateLeadStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!['New', 'Contacted', 'Converted'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }

        const lead = await Lead.findByIdAndUpdate(req.params.id, { status }, {
            new: true,
            runValidators: true
        });

        if (!lead) {
            return res.status(404).json({ success: false, message: 'Lead not found' });
        }

        res.status(200).json({ success: true, data: lead });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Add note to lead
// @route   POST /api/leads/:id/notes
// @access  Private (Admin)
exports.addLeadNote = async (req, res) => {
    try {
        const { text } = req.body;
        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({ success: false, message: 'Lead not found' });
        }

        lead.notes.push({ text });
        await lead.save();

        res.status(200).json({ success: true, data: lead });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
