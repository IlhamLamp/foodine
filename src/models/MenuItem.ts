import mongoose, {model, models, Schema} from "mongoose";

const ExtraPriceSchema = new Schema({
  name: String,
  price: Number,
});

const MenuItemSchema = new Schema({
  image: {type: String},
  name: {type: String},
  description: {type: String},
  category: {type: mongoose.Types.ObjectId, required: true, ref: 'Category'},
  basePrice: {type: Number},
  sizes: {type:[ExtraPriceSchema]},
  stock: {type: Number},
  active: {type: Boolean, default: true},
}, {timestamps: true});

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema);