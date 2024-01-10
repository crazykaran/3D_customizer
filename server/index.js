import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import dalleRoutes from './routes/dalle.routes.js';
// import Replicate from "replicate";


dotenv.config();

// const replicate = new Replicate({
//   auth: process.env.REPLICATE_API_TOKEN,
// });


const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }))

app.use("/api/v1/dalle", dalleRoutes);

app.get('/',async (req, res) => {
    //   const {prompt}=req.body;
    //   console.log(prompt);
    // const output = await replicate.run(
    //   "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
    //   {
    //     input: {
    //       width: 1024,
    //       height: 1024,
    //       prompt: prompt,
    //       scheduler: "K_EULER",
    //       num_outputs: 1,
    //       guidance_scale: 7.5,
    //       num_inference_steps: 50
    //     }
    //   }
    // );
    // console.log(output);
  res.status(200).json({ message: "Hello from replicate" })
})

app.listen(8080, () => console.log('Server has started on port 8080'))