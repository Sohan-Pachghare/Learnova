if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: ".env"});
}
const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

(async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('connected to mongodb');
    } catch (error) {
        console.log(error);
    }
})();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);




app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});