const router = require('express').Router();
const { verifyToken, requireAdmin } = require('../middleware/auth');
const User = require('../models/User');
const Batch = require('../models/Batch');
const Branch = require('../models/Branch');
const Attendance = require('../models/Attendance');
const Payment = require('../models/Payment');

router.use(verifyToken, requireAdmin);

// GET /api/admin/users
router.get('/users', async (req, res) => {
  try {
    const { search, role, status } = req.query;
    const filter = {};
    if (role) filter.role = role;
    if (status) filter.subscriptionStatus = status;
    if (search) filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
    const users = await User.find(filter).populate('branch', 'name').populate('batch', 'name');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/admin/branches
router.get('/branches', async (req, res) => {
  try {
    const branches = await Branch.find();
    res.json(branches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/admin/branches
router.post('/branches', async (req, res) => {
  try {
    const branch = await Branch.create(req.body);
    res.status(201).json(branch);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/admin/branches/:id
router.put('/branches/:id', async (req, res) => {
  try {
    const branch = await Branch.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(branch);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/admin/batches
router.get('/batches', async (req, res) => {
  try {
    const batches = await Batch.find().populate('branch', 'name');
    res.json(batches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/admin/batches
router.post('/batches', async (req, res) => {
  try {
    const batch = await Batch.create(req.body);
    res.status(201).json(batch);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/admin/batches/:id
router.put('/batches/:id', async (req, res) => {
  try {
    const batch = await Batch.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(batch);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/admin/batches/:id
router.delete('/batches/:id', async (req, res) => {
  try {
    await Batch.findByIdAndDelete(req.params.id);
    res.json({ message: 'Batch deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/admin/attendance
router.get('/attendance', async (req, res) => {
  try {
    const { batchId, date } = req.query;
    const filter = {};
    if (batchId) filter.batchId = batchId;
    if (date) {
      const d = new Date(date);
      filter.date = { $gte: d, $lt: new Date(d.getTime() + 86400000) };
    }
    const records = await Attendance.find(filter)
      .populate('userId', 'name email phone')
      .populate('batchId', 'name timing')
      .sort({ date: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/admin/attendance (bulk mark)
router.post('/attendance', async (req, res) => {
  try {
    const { records } = req.body;
    const ops = records.map((r) => ({
      updateOne: {
        filter: { userId: r.userId, batchId: r.batchId, date: new Date(r.date) },
        update: { $set: { status: r.status, markedBy: req.user._id } },
        upsert: true,
      },
    }));
    await Attendance.bulkWrite(ops);
    res.json({ message: 'Attendance saved' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/admin/payments
router.get('/payments', async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('userId', 'name email')
      .populate('batchId', 'name fees')
      .sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/admin/analytics/overview
router.get('/analytics/overview', async (req, res) => {
  try {
    const [totalUsers, activeSubscriptions, payments, branches, batches] = await Promise.all([
      User.countDocuments({ role: 'user' }),
      User.countDocuments({ subscriptionStatus: 'active' }),
      Payment.find({ status: 'paid' }),
      Branch.find({ isActive: true }),
      Batch.find({ isActive: true }),
    ]);

    const totalRevenue = payments.reduce((sum, p) => sum + p.finalAmount, 0);

    const branchStats = await User.aggregate([
      { $match: { role: 'user', branch: { $exists: true, $ne: null } } },
      { $group: { _id: '$branch', count: { $sum: 1 } } },
      { $lookup: { from: 'branches', localField: '_id', foreignField: '_id', as: 'branch' } },
      { $unwind: '$branch' },
      { $project: { name: '$branch.name', count: 1 } },
    ]);

    const monthlyRevenue = await Payment.aggregate([
      { $match: { status: 'paid' } },
      { $group: {
        _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
        revenue: { $sum: '$finalAmount' },
        count: { $sum: 1 },
      }},
      { $sort: { _id: 1 } },
      { $limit: 12 },
    ]);

    res.json({
      totalUsers,
      activeSubscriptions,
      totalRevenue,
      totalBranches: branches.length,
      totalBatches: batches.length,
      branchStats,
      monthlyRevenue,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
