import mongoose from "mongoose";
const ReportSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
    },
    labId: {
      type: String,
      required: [true, "lab id is required"],
    },
    date: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    results: [
        {
          test: String,
          result: String,
          unit: String,
          range: String,
        },
      ],
    patientNumber: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ReportModel = mongoose.model("testreport", ReportSchema);

export default ReportModel;
