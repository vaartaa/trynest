const mongoose = require('mongoose');
const { Schema } = mongoose;

export interface Admin extends Document {
  email: string;
  password: string;
}

export const AdminSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
