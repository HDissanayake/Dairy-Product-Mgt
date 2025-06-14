// index.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

// ===== Safety Check =====
if (!process.env.DB_URL) {
  console.error("❌ Missing DB_URL environment variable in .env");
  process.exit(1);
}

// ===== Middleware =====
app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        frameSrc: ["'self'"],
        connectSrc: ["'self'"],
        imgSrc: ["'self'", 'data:']
      }
    }
  })
);

// ===== API Routes =====
app.use('/api/products', require('./src/products/product.route.js'));
app.use('/api/orders', require('./src/orders/order.route.js'));
app.use('/api/auth', require('./src/users/user.route.js'));
app.use('/api/admin', require('./src/stats/admin.stats.js'));
app.use('/api/messages', require('./src/messages/message.route.js'));
app.use('/api/reports', require('./src/reports/report.route.js'));
// ❌ PayHere route removed

// ===== MongoDB Connection =====
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected successfully"))
.catch((err) => {
  console.error(" MongoDB connection error:", err.message);
  process.exit(1);
});

// ===== Health Check Route =====
app.get('/', (req, res) => {
  res.send(' Dairy Product Server is running!');
});

// ===== Fallback for 404 =====
app.use((req, res) => {
  res.status(404).send(' API endpoint not found');
});

// ===== Start Server =====
app.listen(port, () => {
  console.log(` Server running at: http://localhost:${port}`);
});
