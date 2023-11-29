const express = require('express');
const { initializeApp } = require("firebase/app");
const { getDatabase, ref, push, set, update, get, remove } = require("firebase/database");
const { getStorage, uploadBytes } = require ("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyAqathouN5NbvaOPY1ryIJ4auBQFEjtGcQ",
  authDomain: "cs353-team-18.firebaseapp.com",
  databaseURL: "https://cs353-team-18-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cs353-team-18",
  storageBucket: "cs353-team-18.appspot.com",
  messagingSenderId: "415757809523",
  appId: "1:415757809523:web:6a25c8a7eaa680613eb706",
  measurementId: "G-CZT543S7VH"
};

// Initialize Firebase
const fb = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(fb);
const storage = getStorage(fb);

const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON

function submitRecipe(req, res) {
  const recipeData = req.body; // Accessing the JSON payload from the request body

  const recipesRef = ref(database, '/recipes'); // Reference to the recipes node in your database

  const newRecipeRef = push(recipesRef, recipeData); // Store the return value of push

  newRecipeRef.then(() => {
    const recipeKey = newRecipeRef.key; // Access the key of the new recipe

    const recipeSearch = {
      id: recipeKey,
      image: req.body.image,
      title: req.body.title,
      dishTypes: req.body.dishTypes,
      diets: req.body.diets,
      ingredients: req.body.ingredients
    };
  
    const searchRef = ref(database, `/search/${recipeKey}`);
  
    set(searchRef, recipeSearch);

    console.log(`Recipe submitted successfully with key: ${recipeKey}`); // Print the key to the console
    res.status(200).send(`Recipe submitted successfully with key: ${recipeKey}`);
  }).catch((error) => {
    console.error(error);
    res.status(400).send(error);
  });
}

async function submitImage(req, res){
  if (!req.file) {
      return res.status(400).send('No file uploaded.');
  }

  try {
      // Create a reference to 'images/filename'
      const fileRef = ref(storage, `images/${req.file.originalname}`);

      // Upload the file to Firebase Storage
      const snapshot = await uploadBytes(fileRef, req.file.buffer);

      // Get the URL of the uploaded file
      const url = await getDownloadURL(snapshot.ref);

      res.status(200).send({url});
  } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
  }
}

app.get('/api/user/get/:id', (req, res) => {
  const id = req.params.id;
  const userRef = ref(database, `/users/${id}`);
  get(userRef).then((snapshot) => {
    if (snapshot.exists()) {
      const user = snapshot.val();
      res.status(200).send(user);
    } else {
      res.status(404).send('User not found');
    }
  }).catch((error) => {
    console.error(error);
    res.status(500).send(error);
  });
});

app.post('/api/user/create/:id', (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  const userRef = ref(database, `/users/${userId}`);
  set(userRef, userData)
    .then(() => {
      console.log(`User created successfully with id: ${userId}`);
      res.status(200).json({ id: userId, ...userData});
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send(error);
    });
});

app.post('/api/user/update/:id', (req, res) => {
  const id = req.params.id;
  const userData = req.body;
  const userRef = ref(database, `/users/${id}`);
  update(userRef, userData).then(() => {
    console.log(`User updated successfully with id: ${id}`);
    res.status(200).json({ id: id, ...userData});
  }).catch((error) => {
    console.error(error);
    res.status(400).send(error);
  });
});

app.delete('/api/user/delete/:id', (req, res) => {
  const id = req.params.id;
  const userRef = ref(database, `/users/${id}`);
  remove(userRef).then(() => {
    console.log(`User deleted successfully with id: ${id}`);
    res.status(200).send(`User deleted successfully with id: ${id}`);
  }).catch((error) => {
    console.error(error);
    res.status(400).send(error);
  });
});

app.post('/submit-recipe', (req, res) => {
  submitRecipe(req, res);
});

app.post('/submit-image', (req, res) => {
  submitImage(req, res);
});

app.get('/search', (req, res) => {
  console.log("SEARCHHHH HAS BEEN CALLED ");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});