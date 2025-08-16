import mongoose, { model } from "mongoose";

const ClientSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  companyName: String,
  services: [String],
  budgetUsd: Number,
  projectStartDate: String,
  acceptTerms: Boolean,

},{timestamps:true})

const Client = mongoose.model("Client",ClientSchema)
export default Client 