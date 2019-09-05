const mongoose  =require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    start_date: Date,
    end_date: Date,
    confirmed: Boolean
});

module.exports = mongoose.model('order', OrderSchema);
