const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const purchseSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: "User"
    },
    courseId: {
        type:ObjectId,
        ref: "Course"
    }
})

const Purchase = mongoose.model("Purchase", purchseSchema);

module.exports = Purchase;