const mongoose = require('mongoose');
const { Schema } = mongoose;

export interface Student extends Document {
  email: string;
  password: string;
}

export const StudentSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  rollnumber: {
    type: String,
    required: true,
  },
});
