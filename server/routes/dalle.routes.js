import express from 'express';
import * as dotenv from 'dotenv';
// import { Configuration, OpenAIApi} from 'openai';
import Replicate from "replicate";
import fetch from 'node-fetch';

dotenv.config();

const router = express.Router();

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});
// const config = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });


// const openai = new OpenAIApi(config);

router.route('/').get((req, res) => {
  res.status(200).json({ message: "Hello from a DALL.E ROUTES" })
})

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    // const response = await openai.createImage({
    //   prompt,
    //   n: 1,
    //   size: '1024x1024',
    //   response_format: 'b64_json'
    // });

    const output = await replicate.run(
      "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
      {
        input: {
          width: 1024,
          height: 1024,
          prompt: prompt,
          scheduler: "K_EULER",
          num_outputs: 1,
          guidance_scale: 7.5,
          num_inference_steps: 50
        }
      }
    );
      const imageUrl=output[0];
      //converting link to b64json
      fetch(imageUrl)
      .then(response => response.arrayBuffer())
      .then(buffer => {
          // Convert buffer to Base64 and create JSON structure
          const base64Image = Buffer.from(buffer).toString('base64');
          const b64Json = {
              b64_string: base64Image,
              // metadata: {
              //     // Add any additional metadata here
              // }
          };
          // Use the b64Json object as needed
          console.log(b64Json);
          res.status(200).json({ photo: b64Json });
      })
      .catch(error => {
          console.error('Error fetching image:', error);
      });
      //end
      // console.log(image);
      // console.log(b64Json);
    // const image = response.data.data[0].b64_json;

    // res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" })
  }
})
export default router;