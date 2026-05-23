const router = require('express').Router();
const { verifyToken } = require('../middleware/auth');
const User = require('../models/User');
const Attendance = require('../models/Attendance');
const Payment = require('../models/Payment');

router.use(verifyToken);

// GET /api/user/dashboard
router.get('/dashboard', async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('branch', 'name address phone timings')
      .populate('batch', 'name timing instructor fees category daysOfWeek');

    const [attendance, payments] = await Promise.all([
      Attendance.find({ userId: req.user._id }).sort({ date: -1 }).limit(30),
      Payment.find({ userId: req.user._id }).sort({ createdAt: -1 }).limit(5),
    ]);

    const presentDays = attendance.filter((a) => a.status === 'present').length;
    const attendancePercent = attendance.length
      ? Math.round((presentDays / attendance.length) * 100)
      : 0;

    res.json({ user, attendance, payments, attendancePercent });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/user/attendance
router.get('/attendance', async (req, res) => {
  try {
    const { month, year } = req.query;
    const filter = { userId: req.user._id };
    if (month && year) {
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 0, 23, 59, 59);
      filter.date = { $gte: start, $lte: end };
    }
    const records = await Attendance.find(filter)
      .populate('batchId', 'name timing')
      .sort({ date: -1 });

    const present = records.filter((r) => r.status === 'present').length;
    const percent = records.length ? Math.round((present / records.length) * 100) : 0;

    res.json({ records, summary: { total: records.length, present, percent } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/user/payments
router.get('/payments', async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user._id })
      .populate('batchId', 'name fees')
      .sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/user/subscription
router.get('/subscription', async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('batch', 'name timing fees instructor')
      .populate('branch', 'name address');
    res.json({
      status: user.subscriptionStatus,
      batch: user.batch,
      branch: user.branch,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/user/profile
router.put('/profile', async (req, res) => {
  try {
    const allowed = ['name', 'phone', 'address', 'pincode', 'emergencyContact', 'medicalConditions'];
    const updates = {};
    allowed.forEach((field) => { if (req.body[field] !== undefined) updates[field] = req.body[field]; });
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
