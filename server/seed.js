require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Branch = require('./models/Branch');
const Batch = require('./models/Batch');
const Attendance = require('./models/Attendance');
const Payment = require('./models/Payment');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bilva-yogashala';

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Branch.deleteMany({}),
    Batch.deleteMany({}),
    Attendance.deleteMany({}),
    Payment.deleteMany({}),
  ]);
  console.log('Cleared existing data');

  // ── Branches ──────────────────────────────────────────────────
  const branches = await Branch.insertMany([
    {
      name: 'Andheri West',
      address: 'Shop 12, Lokhandwala Complex, Andheri West',
      city: 'Mumbai',
      phone: '+91 98765 43210',
      email: 'andheri@bilvayoga.com',
      mapLink: 'https://maps.google.com/?q=Lokhandwala+Complex+Andheri+West+Mumbai',
      timings: 'Mon–Sat: 5:30 AM – 9:00 PM',
      isActive: true,
    },
    {
      name: 'Goregaon West',
      address: 'A-4, Oberoi Mall Road, Goregaon West',
      city: 'Mumbai',
      phone: '+91 98765 43211',
      email: 'goregaon@bilvayoga.com',
      mapLink: 'https://maps.google.com/?q=Oberoi+Mall+Goregaon+West+Mumbai',
      timings: 'Mon–Sat: 6:00 AM – 8:30 PM',
      isActive: true,
    },
    {
      name: 'Thane West',
      address: 'B-201, Viviana Mall Complex, Thane West',
      city: 'Thane',
      phone: '+91 98765 43212',
      email: 'thane@bilvayoga.com',
      mapLink: 'https://maps.google.com/?q=Viviana+Mall+Thane+West',
      timings: 'Mon–Sat: 6:00 AM – 8:00 PM',
      isActive: true,
    },
  ]);
  console.log(`Created ${branches.length} branches`);

  // ── Batches ───────────────────────────────────────────────────
  const batches = await Batch.insertMany([
    {
      name: 'Morning Hatha Yoga',
      category: 'adult',
      instructor: 'Guru Ravi Shankar',
      timing: '6:00 AM – 7:00 AM',
      duration: '60 min',
      fees: 2500,
      capacity: 20,
      seatsAvailable: 8,
      type: 'offline',
      branch: branches[0]._id,
      description: 'A calming morning session focusing on classical Hatha poses, breathwork (pranayama), and meditation. Perfect for all levels.',
      level: 'all',
      daysOfWeek: ['Monday', 'Wednesday', 'Friday'],
      isActive: true,
    },
    {
      name: 'Kids Yoga Fun',
      category: 'kids',
      instructor: 'Priya Nair',
      timing: '4:00 PM – 4:45 PM',
      duration: '45 min',
      fees: 1800,
      capacity: 15,
      seatsAvailable: 5,
      type: 'offline',
      branch: branches[1]._id,
      description: 'A playful and engaging yoga class designed for children aged 5–14. Improves flexibility, focus, and confidence through fun poses and games.',
      level: 'beginner',
      daysOfWeek: ['Monday', 'Tuesday', 'Thursday', 'Saturday'],
      isActive: true,
    },
    {
      name: 'Senior Gentle Yoga',
      category: 'senior',
      instructor: 'Dr. Anand Iyer',
      timing: '8:00 AM – 9:00 AM',
      duration: '60 min',
      fees: 2000,
      capacity: 12,
      seatsAvailable: 4,
      type: 'offline',
      branch: branches[2]._id,
      description: 'Gentle chair-assisted and mat yoga for seniors 55+. Focuses on joint mobility, balance, and stress reduction. No prior yoga experience needed.',
      level: 'beginner',
      daysOfWeek: ['Tuesday', 'Thursday', 'Saturday'],
      isActive: true,
    },
    {
      name: 'Therapy Yoga',
      category: 'therapy',
      instructor: 'Dr. Meera Kulkarni',
      timing: '7:00 AM – 8:00 AM',
      duration: '60 min',
      fees: 3500,
      capacity: 8,
      seatsAvailable: 2,
      type: 'hybrid',
      branch: branches[0]._id,
      description: 'Therapeutic yoga for back pain, spondylitis, arthritis, and stress disorders. Personalized attention in small batch settings with medical consultation.',
      level: 'all',
      daysOfWeek: ['Monday', 'Wednesday', 'Friday'],
      isActive: true,
    },
  ]);
  console.log(`Created ${batches.length} batches`);

  // ── Admin User ────────────────────────────────────────────────
  const admin = await User.create({
    name: 'Bilva Admin',
    email: 'admin@bilva.com',
    password: 'Admin@123',
    role: 'admin',
    phone: '+91 98765 00001',
    gender: 'male',
    subscriptionStatus: 'active',
    branch: branches[0]._id,
  });

  // ── Regular Student ───────────────────────────────────────────
  const student = await User.create({
    name: 'Priya Student',
    email: 'student@bilva.com',
    password: 'User@123',
    role: 'user',
    phone: '+91 98765 00002',
    gender: 'female',
    dob: new Date('1995-06-15'),
    address: '42, Andheri West, Mumbai',
    pincode: '400053',
    branch: branches[0]._id,
    batch: batches[0]._id,
    subscriptionStatus: 'active',
    emergencyContact: { name: 'Ramesh Sharma', phone: '+91 98765 00003', relation: 'Husband' },
    medicalConditions: 'None',
  });
  console.log(`Created admin: ${admin.email}, student: ${student.email}`);

  // ── Sample Attendance ─────────────────────────────────────────
  const today = new Date();
  const attendanceRecords = [];
  for (let i = 0; i < 20; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    attendanceRecords.push({
      userId: student._id,
      batchId: batches[0]._id,
      branchId: branches[0]._id,
      date,
      status: Math.random() > 0.25 ? 'present' : 'absent',
      markedBy: admin._id,
    });
  }
  await Attendance.insertMany(attendanceRecords);
  console.log('Created 20 attendance records');

  // ── Sample Payments ───────────────────────────────────────────
  await Payment.insertMany([
    {
      userId: student._id,
      batchId: batches[0]._id,
      amount: 2500,
      finalAmount: 2500,
      status: 'paid',
      month: 'May 2026',
      razorpayPaymentId: 'pay_demo_001',
    },
    {
      userId: student._id,
      batchId: batches[0]._id,
      amount: 2500,
      couponCode: 'YOGA10',
      discount: 250,
      finalAmount: 2250,
      status: 'paid',
      month: 'April 2026',
      razorpayPaymentId: 'pay_demo_002',
    },
  ]);
  console.log('Created 2 payment records');

  console.log('\n✅ Database seeded successfully!');
  console.log('   Admin:   admin@bilva.com   / Admin@123');
  console.log('   Student: student@bilva.com / User@123');

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
