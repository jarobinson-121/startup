const express = require('express');
const uuid = require('uuid');
const app = express();
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');

let users = {};
let theories = []

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

app.use(cors());

app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  const user = users[req.body.userName];
  if (user) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = { userName: req.body.userName, password: req.body.password, token: uuid.v4() };
    users[user.userName] = user;

    res.send({ token: user.token });
  }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = users[req.body.userName];
  if (user) {
    if (req.body.password === user.password) {
      user.token = uuid.v4();
      res.send({ token: user.token });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.post('/generate', async (req, res) => {
    const { prompt } = req.body;
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { "role": "system", "content": "You are a helpful assistant." },
            { "role": "user", "content": `Create a conspiracy theory based on: "${prompt}". Respond in JSON with "title" and "theory" fields.` }
          ],
          max_tokens: 200,
          temperature: 0.9,
        })
      });
  
      if (!response.ok) {
        throw new Error(`OpenAI API Error: ${response.statusText}`);
      }
  
      const data = await response.json();
      const rawText = data.choices[0].message.content.trim();
  
      let theoryTitle = "Untitled";
      let theoryText = rawText;
      try {
        const parsed = JSON.parse(rawText);
        theoryTitle = parsed.title;
        theoryText = parsed.theory;
      } catch (err) {
        console.error("Failed to parse model JSON:", err);
      }
  
      res.json({ title: theoryTitle, theory: theoryText });
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      res.status(500).json({ error: "Failed to generate theory" });
    }
  });
    

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', (req, res) => {
  const user = Object.values(users).find((u) => u.token === req.body.token);
  if (user) {
    delete user.token;
  }
  res.status(204).end();
});

function saveTheory(newTheory, theories) {
    theories.push(newTheory);
    return theories;
}

// Get Saved Theories
apiRouter.get('/theories', (_req, res) => {
    res.send(theories);
  });

// Submit New Theory
apiRouter.post('/theory', (req, res) => {
    theories = saveTheory(req.body, theories);
    res.send(theories);
  });

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });
  
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });