const router = require('express').Router();
const Batch = require('../models/Batch');
const Branch = require('../models/Branch');

// GET /api/public/batches
router.get('/batches', async (req, res) => {
  try {
    const { category, type, branch } = req.query;
    const filter = { isActive: true };
    if (category) filter.category = category;
    if (type) filter.type = type;
    if (branch) filter.branch = branch;
    const batches = await Batch.find(filter).populate('branch', 'name city');
    res.json(batches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/public/branches
router.get('/branches', async (req, res) => {
  try {
    const branches = await Branch.find({ isActive: true });
    res.json(branches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/public/testimonials
router.get('/testimonials', (req, res) => {
  res.json([
    { id: 1, name: 'Priya Sharma', rating: 5, text: 'Bilva Yogashala transformed my life! The instructors are incredibly knowledgeable and the classes are perfectly paced.', batch: 'Morning Hatha', avatar: null },
    { id: 2, name: 'Rajesh Mehta', rating: 5, text: 'Been practicing here for 2 years. The therapy yoga classes helped me overcome my chronic back pain completely.', batch: 'Therapy Yoga', avatar: null },
    { id: 3, name: 'Ananya Patel', rating: 5, text: 'My kids absolutely love the children\'s yoga classes. Their focus and flexibility have improved dramatically!', batch: 'Kids Yoga', avatar: null },
    { id: 4, name: 'Suresh Iyer', rating: 4, text: 'The senior yoga classes are gentle yet effective. I feel more energetic at 65 than I did at 50!', batch: 'Senior Yoga', avatar: null },
    { id: 5, name: 'Meera Nair', rating: 5, text: 'The glassmorphism-themed studio ambience is beautiful and the online classes are just as effective as in-person.', batch: 'Online Flow', avatar: null },
    { id: 6, name: 'Vikram Joshi', rating: 5, text: 'Outstanding instruction and a wonderful community. Highly recommend to anyone looking to start their yoga journey.', batch: 'Adult Hatha', avatar: null },
  ]);
});

module.exports = router;
