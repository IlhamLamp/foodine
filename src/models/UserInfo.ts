import {model, models, Schema} from "mongoose";

const UserLocation = new Schema({
  latitude: String,
  longitude: String,
});

const UserInfoSchema = new Schema({
  email: {type: String, required: true},
  phone: {type: String},
  location: {type: UserLocation},
  province: {type: String},
  regencies: {type: String},
  district: {type: String},
  villages: {type: String},
  postalCode: {type: String},
  address: {type: String},
  admin: {type: Boolean, default: false}
}, {timestamps: true});

export const UserInfo = models?.UserInfo || model('UserInfo', UserInfoSchema);