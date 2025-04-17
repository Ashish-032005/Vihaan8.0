import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  domain: String,
  category: String,
  timeSpent: {
    type: Number,
    default: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const childSchema = new mongoose.Schema({
  name: String,
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
