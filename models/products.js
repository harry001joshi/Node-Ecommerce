const mongoose = require('mongoose');

// what is specified in the schema only that will be sent to the database, rest will be ignored
const ProductsSchema = new mongoose.Schema({
    // products fiels will be defined here
    name: {
        type: String,
        required: [true, "Please Provide Name"],
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Please Provide Price"],
        default: 0
    },
    description: {
        type: String,
        required: [true, "please provide description"],
    },
    image: {
        type: String,
        default: '/def/def.jpg'
    },

    small_Images: {
        type: [String],
        default: function () {
            const img = this.image;
            return [img, img, img, img, img];
        }
    },
    category: {
        type: [String],
        required: [true, 'Please provide product Category'],
        trim: true
    },
    tags: {
        type: [String],
        required: [true, "Please Provide tags"],
        default: function(){
            return this.category;
        }
    },
    inventory: {
        type: Number,
        required: true,
        default: 10
    },
    rating: {
        type: Number,
        default: 0
    },
    numberOfReviews: {
        type: Number,
        default: 0,
    },
    colors: {
        type: [String],
        default: ['#222'],
    },
    featured: {
        type: Boolean,
        default: false,
    },
    sale: {
        type: Boolean,
        default: false
    },
    sizes: {
        type: [String],
        default: ["M", "L", "XL", "XXL"],
    },
    otherInfo: {
        type: Object,
        default: {
            sku: 21,
        }
    }
}, { timestamps: true });

// ProductsSchema.pre('save', function (next) {
//     img = this.image;
//     this.small_Images = [img, img, img, img, img];
//     next();
// });

module.exports = mongoose.model('Products', ProductsSchema);