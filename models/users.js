import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
   name: {
    type: String,
    required: true,
   },
   email: {
    type: String,
    required: true,
    unique: true,
   },
   password: {
     type: String,
     required: true,
   },
   phone: {
    type: String,
    required: true,
    match: /^\+?[0-9]{10,15}$/,
   },
   token: {
      type: String,
      default: null,
   },
},
   {
    versionKey: false,
    timestamps: true,
   }
);

const User = mongoose.model('User', usersSchema);

export default User;