require("dotenv").config();
const { apiKey } = require("airtable");
const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
console.log(configuration);
const openai = new OpenAIApi(configuration);

const port = process.env.PORT || 9000;

app.post("/ask", async (req, res) => {
  const prompt = req.body.prompt;

  try {
    if (!prompt) {
      throw new Error("Uh oh, no prompt was provided");
    }

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 100,
    });
    // console.log(response, 'res');
    let completion
    
    const data = response.data;
    // console.log(data, 'data');
    if (data.choices && data.choices.length > 0) {
      completion = data.choices[0].text;
      // console.log(completion);
    } else {
      console.error("No choices found in the response.");
    }

    return res.status(200).json({
      success: true,
      message: completion,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}!!`));
