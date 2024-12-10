const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const theoryCollection = db.collection('recentTheories');

const recentTheories = 'recentTheories';

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(userName) {
  return userCollection.findOne({ username: userName });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(userName, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    username: userName,
    password: passwordHash,
    token: uuid.v4(),
    theories: [],
  };
  await userCollection.insertOne(user);

  return user;
}

async function addTheory(theory, userToken) {
  const user = await getUserByToken(userToken);

  if (!user) {
    throw new Error('Invalid token. User not authenticated.');
  }

  await userCollection.updateOne(
    { _id: user._id },
    { $push: { theories: theory } } 
  );

  return theory;
}

async function initializeTheoriesList() {
  try {
    const record = await theoryCollection.findOne({ _id: recentTheories });

    if (!record) {
      await theoryCollection.insertOne({ _id: recentTheories, theories: [] });
    }
  } catch (error) {
    console.error('Error initializing the recent theories list:', error.message);
  }
}

async function addToList(theory) {
  await theoryCollection.updateOne(
    { _id: recentTheories },
    { $push: { theories: { $each: [theory], $position: 0, $slice: 3}}}
  );
}

async function getTheoriesList() {
  const record = await theoryCollection.findOne({ _id: recentTheories });
  return record ? record.theories : [];
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  addTheory,
  initializeTheoriesList,
  addToList,
  getTheoriesList,
};
