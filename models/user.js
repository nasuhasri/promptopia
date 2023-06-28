import { Schema, model, models } from "mongoose";

const UserSchema = newSchema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email already exists!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      'Username invalid, it should contain 8-20 alphanumeric letters and be unique!',
    ],
  },
  image: {
    type: String
  }
});

// The "models" object is provided by the Mongoose library and stores all the registered models.
// If a model names "User" already exists in the "models" object, it assigns that existing model to the "User" variable.
// This prevents redefining the model and ensures that the existing model is reused.

// If a model named "User" does not exists in the "models" object, the "model" function from Mongoose is called to create a new model.
// The newly created model is the assigned to the "User" variable.

// do this with regular always on, always running backend server
// const User = model("User", UserSchema);

// nextjs is different where the route is only going to be created and running when it is get called
// look into models.User and see if its there and if its not there, create a new model
const User = models.User || model("User", UserSchema);

export default User;