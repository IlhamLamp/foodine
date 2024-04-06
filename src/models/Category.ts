import { model, models, Schema } from "mongoose";

const CategoryScheme = new Schema({
    name: {type: String, required: true},
}, {timestamps: true});

export const Category = models?.Category || model('Category', CategoryScheme);