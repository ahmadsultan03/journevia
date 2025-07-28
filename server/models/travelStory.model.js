import mongoose from "mongoose";

const travelStorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    story: { type: String, required: true },
    visitedLocation: { type: [String], default: [] },
    isFavorite: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    imageUrl: { type: String, required: true },
    visitedDate: { type: Date, default: Date.now }
}, {
    timestamps: true
}); 

const TravelStory = mongoose.model("TravelStory", travelStorySchema);

export default TravelStory;
// Exporting the model to be used in other parts of the application
// This model can be used to create, read, update, and delete travel stories in the database
// The schema defines the structure of the travel story documents in MongoDB