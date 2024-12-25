const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// Import routes
const authRoutes = require('./routes/authRoute');
const bookRoutes = require('./routes/createBookRoute');
const uniPointRoutes = require('./routes/uniPointsRoute')
const purchaseBookRoutes = require('./routes/purchaseBookRoute')
const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = 'mongodb+srv://designnest:designnest@cluster0.d8wegaz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/unipoints',uniPointRoutes)
app.use('/api',purchaseBookRoutes)
// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
