import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  complaint_id: { type: String, required: true, unique: true }, // Unique complaint ID
  studentAddress: { type: String, required: true },
  image: { 
    data: Buffer,            // Actual binary data of the image
    contentType: String      // MIME type, e.g., 'image/png'
  },
  admin_feedback: { type: String, default: '' } // Admin's feedback
});

const Complaint = mongoose.model('Complaint', complaintSchema);
export default Complaint;
