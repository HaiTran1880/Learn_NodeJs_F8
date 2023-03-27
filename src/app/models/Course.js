const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoose_delete = require('mongoose-delete');
const slug = require('mongoose-slug-generator')
const AutoIncrementFactory = require('mongoose-sequence');
const Course = new Schema({
    _id: { type: Number },
    name: { type: String, maxLength: 255 },
    description: { type: String, maxLength: 600 },
    image: { type: String, maxLength: 255 },
    slug: { type: String, slug: 'name', unique: true },

}, {
    _id: false,
    timestamps: true
})
Course.plugin(mongoose_delete, { overrideMethods: 'all', deletedAt: true })
Course.plugin(AutoIncrementFactory);
mongoose.plugin(slug)
module.exports = mongoose.model('Course', Course)