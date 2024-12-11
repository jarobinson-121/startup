const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const app = express();
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');
const DB = require('./database.js');

let users = {};
let theories = [];

const authCookieName = 'token';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

app.use(cookieParser());

app.use(cors());

app.use(express.static('public'));

app.set('trust proxy', true);

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
    if (await DB.getUser(req.body.userName)) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const user = await DB.createUser(req.body.userName, req.body.password);
  
      // Set the cookie
      setAuthCookie(res, user.token);
  
      res.send({
        id: user._id,
      });
    }
  });

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
    const user = await DB.getUser(req.body.userName);
    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        setAuthCookie(res, user.token);
        res.send({ id: user._id });
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
        { "role": "system", "content": "You are a helpful assistant. Respond only with JSON." },
        { "role": "user", "content": `Create a conspiracy theory based on: "${prompt}". Respond with a JSON object containing "title" and "theory". Do not include any additional text, Markdown, or code block formatting.` }
        ],
        max_tokens: 200,
        temperature: 0.9,
    })
    });

    if (!response.ok) {
    throw new Error(`OpenAI API Error: ${response.statusText}`);
    }

    const data = await response.json();
    let rawText = data.choices[0].message.content.trim();

    let theoryTitle = "Untitled";
    let theoryText = rawText;

    // Clean Markdown formatting
    if (rawText.startsWith("```")) {
    rawText = rawText.replace(/```(?:json)?|```/g, '').trim();
    }

    // Attempt to parse JSON
    try {
    console.log("Raw JSON String Before Parsing:", rawText); // Debugging
    const parsed = JSON.parse(rawText);
    theoryTitle = parsed.title;
    theoryText = parsed.theory;
    } catch (err) {
    console.error("Failed to parse model JSON:", err);
    console.error("Cleaned Text Attempted to Parse:", rawText);
    }

    const newTheory = { title: theoryTitle, description: theoryText };

    try {
        await DB.addToList(newTheory);
    } catch (error) {
        console.error('Error saving theory to recent list:', error);
        res.status(500).send({ msg: 'Failed to save theory to recent list' });
    }

    res.json(newTheory);
} catch (error) {
    console.error("Error calling OpenAI API:", error);
    res.status(500).json({ error: "Failed to generate theory" });
}
});
  
// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
    res.clearCookie(authCookieName);
    res.status(204).end();
});

// secureApiRouter verifies credentials for endpoints
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

secureApiRouter.post('/saveusertheory', async (req, res) => {
    const authToken = req.cookies[authCookieName];
    const newTheory = req.body;

    try {
        const savedTheory = await DB.addTheory(newTheory, authToken);
        res.send(savedTheory);
    } catch (error) {
        console.error('Error saving theory:', error);
        res.status(500).send({ msg: 'Failed to save theory' });
    }
  });

secureApiRouter.get('/usertheories', async (req, res) => {
    const authToken = req.cookies[authCookieName];

    try {
        const user = await DB.getUserByToken(authToken);
        if(user) {
            res.send(user.theories);
        } else {
            res.status(401).send({ msg: 'Unauthorized' });
        }
    } catch (error) {
        console.error('Error fetching theories:', error);
        res.status(500).send({ msg: 'Failed to fetch theories' });
    }
});

// Need a route for save theory to recent theories list
secureApiRouter.post('/newtheory', async (req, res) => {
    const theory = req.body;
    
    try {
        await DB.addToList(theory);
        res.status(201).send({ msg: 'Theory added to recent list' });
    } catch (error) {
        console.error('Error saving theory to recent list:', error);
        res.status(500).send({ msg: 'Failed to save theory to recent list' });
    }
  });


// Need a route to get list of recent theories
secureApiRouter.get('/recenttheories', async (req, res) => {
    try {
        const theories = await DB.getTheoriesList();
        res.send(theories);
    } catch (error) {
        console.error('Error fetching recent theories:', error);
        res.status(500).send({ msg: 'Failed to fetch recent theories' });
    }
});


// Save theory to user list
apiRouter.post('/theory', (req, res) => {
    theories = saveTheory(req.body, theories);
    res.send(theories);
  });

// Default error handler
app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
  });
  
  // Return the application's default page if the path is unknown
  app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });
  
  // setAuthCookie in the HTTP response
  function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
  }
  
  const httpService = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });