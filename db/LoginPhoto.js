const mongoose = require("mongoose");

const LoginPhotoSchema = new mongoose.Schema(
  {
   image:String
  },
  {
    collection: "ImageDetails",
  }
);

mongoose.model("LoginPhoto", LoginPhotoSchema);
