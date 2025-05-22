import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  url: String,
  domain: String,
  dailyTimeSpent: {
    type: Map,
    of: Number, 
    default: {}
  },
  lastUpdated: { type: Date, default: Date.now }
});

const childSchema = new mongoose.Schema({
  name:String,
  email: {
    type:String,
    unique:true,
  },
  extensionToken: String,
  blockedUrls: [String],
  monitoredUrls: [urlSchema],
  incognitoAlerts: [
    {
      url: String,
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

export default mongoose.model("Child", childSchema);
