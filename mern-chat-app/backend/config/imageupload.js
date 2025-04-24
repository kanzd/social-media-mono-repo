// const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });
const { createClient } = require('@supabase/supabase-js')
const supabase = createClient('https://ybutcjrfzigxxjnxybta.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlidXRjanJmemlneHhqbnh5YnRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0NjU2NzgsImV4cCI6MjA2MTA0MTY3OH0.kleN4UkCxxqmpkhgMhNCUaOMseB5ZFIm88t5IcVNaUM')

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_ClOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

const imageupload = async (file, usepreset) => {
  try {
    console.log("file", file);

    // Set default value for usepreset to true if not provided
    usepreset = usepreset === undefined ? true : usepreset;

    let options = {};
    if (usepreset) {
      options = { upload_preset: "chat-app" };
    } else {
      options = { resource_type: "auto" };
    }
    const { data, error } = await supabase.storage.from('hik8').upload(file.name, file)
    // const result = await new Promise((resolve, reject) => {
    //   cloudinary.uploader
    //     .upload_stream(options, (error, result) => {
    //       if (error) {
    //         console.error(error);
    //         reject(error);
    //       } else {
    //         console.log("result", result);
    //         resolve(result);
    //       }
    //     })
    //     .end(file.buffer);
    // });

    // Extract the secure URL from the Cloudinary response
    const imageUrl = data.fullPath;
    console.log("imageUrl", imageUrl);
    return imageUrl;
  } catch (error) {
    console.error(error);
    return ""; // Return empty string in case of error
  }
};

module.exports = imageupload;
