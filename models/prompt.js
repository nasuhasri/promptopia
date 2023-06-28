import mongoose, { Schema, model, models } from "mongoose";

const PromptScheme = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User', // 1 user able to create many prompt
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is required.'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required.'],
  }
});

// get the model prompt that already exists or create new model called Prompt based on the PromptScheme
const Prompt = models.Prompt || model('Prompt', PromptScheme);

export default Prompt;