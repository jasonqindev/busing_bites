const express = require('express');
const crypto = require('crypto');
const { initializeApp } = require("firebase/app");
const { getDatabase, ref, push, set, update, get, remove } = require("firebase/database");
const { getStorage, uploadBytes, getDownloadURL, updateMetadata } = require("firebase/storage");

const sRef = require('firebase/storage').ref;

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
      userId: req.body.userId,
      image: req.body.image,
      title: req.body.title,
      dishTypes: req.body.dishTypes,
      diets: req.body.diets ?? [],
      ingredients: req.body.ingredients,
      allergies: req.body.allergies ?? [],
      cuisine: req.body.cuisine ?? []
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

/*
function searchRecipe(req, res){
  const info = {
    title: req.body.title,
    recipeTypes: req.body.types,
    diets: req.body.diets,
    cuisine: req.body.cuisine,
    allergies: req.body.allergies,
    needed: req.body.includeIngredients,
    exclude: req.body.excludeIngredients
  };
  console.log(info);
  const recipesRef = ref(database, '/search');

  get(recipesRef).then((snapshot) => {
    if (snapshot.exists()) {
      let recipes = snapshot.val();

      // Filter based on search criteria
      recipes = Object.values(recipes).filter(recipe => {
        let titleMatch = false;
        let typesMatch = true;
        let dietsMatch = true;
        let cuisineMatch = true;
        let allergyMatch = true;
        let neededMatch = true;
        let excludeMatch = true;

        if(info.title == recipe.title){
          titleMatch = true;
        }

        info.recipeTypes.forEach(type => {
          if(!(recipe.dishTypes.includes(type))){
            typesMatch = false;
          }
        });

        info.diets.forEach(diet => {
          if(!(recipe.diets.includes(diet))){
            dietsMatch = false;
          }
        });

        info.cuisine.forEach(cuisine => {
          if(!(recipe.cuisine.includes(cuisine))){
            cuisineMatch = false;
          }
        });

        info.allergies.forEach(allergy => {
          if(!(recipe.allergies.includes(allergy))){
            allergyMatch = false;
          }
        });

        info.needed.forEach(ingredient => {
          if(!(recipe.incredients.includes(ingredient))){
            neededMatch = false;
          }
        });

        info.exclude.forEach(ingredient => {
          if((recipe.incredients.includes(ingredient))){
            excludeMatch = false;
          }
        });
        
        return titleMatch && dietsMatch && typesMatch && cuisineMatch && allergyMatch && neededMatch && excludeMatch;
      });

      // Limit to 20 results
      recipes = recipes.slice(0, 20);

      res.status(200).send(recipes);
    } else {
      res.status(404).send('No recipes found');
    }
  }).catch((error) => {
    console.error(error);
    res.status(500).send(error);
  });
} */

function getRecipe(req, res){
  const recipeId = req.query.id;
  const recipeRef = ref(database, `/recipes/${recipeId}`);

  get(recipeRef).then((snapshot) => {
    if (snapshot.exists()) {
      const recipe = snapshot.val();
      res.status(200).send(recipe);
    } else {
      res.status(404).send('Recipe not found');
    }
  }).catch((error) => {
    console.error(error);
    res.status(500).send(error);
  });
}

function getRandomRecipe(req, res){
  const searchRef = ref(database, `/search`);

  get(searchRef).then((snapshot) => {
    if (snapshot.exists()) {
      const recipes = snapshot.val();
      const recipeKeys = Object.keys(recipes); // Get an array of keys

      if (recipeKeys.length === 0) {
        res.status(404).send('No recipes found');
        return;
      }

      const randomIndex = Math.floor(Math.random() * recipeKeys.length); // Generate a random index
      const randomRecipe = recipes[recipeKeys[randomIndex]]; // Get the recipe using the random key

      res.status(200).send(randomRecipe);
    } else {
      res.status(404).send('No recipes found');
    }
  }).catch((error) => {
    console.error(error);
    res.status(500).send(error);
  });
}

function getAllRecipes(req,res){
  const recipeRef = ref(database, `/recipes`);

  get(recipeRef).then((snapshot) => {
    if (snapshot.exists()) {
      const recipe = snapshot.val();
      res.status(200).send(recipe);
    } else {
      res.status(404).send('Recipe list not found');
    }
  }).catch((error) => {
    console.error(error);
    res.status(500).send(error);
  });
}

function getRecipeByUserId(req, res){
  const userId = req.query.userid;

  const recipesRef = ref(database, `/recipes`);

  get(searchRef).then((snapshot) => {
    if (snapshot.exists()) {
      let recipes = snapshot.val();

      // Filter based on search criteria
      recipes = Object.values(recipes).filter(recipe => {
        let match = false;

        if(recipe.userId == userId){
          match = true;
        }
       
        return match;
      });

      res.status(200).send(recipes);
    } else {
      res.status(404).send('No recipes found');
    }
  }).catch((error) => {
    console.error(error);
    res.status(500).send(error);
  });
}


/**
 * Handles image submission
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
async function submitImage(req, res) {
  let buffer = Buffer.alloc(0);

  // read the image into a buffer, and check if it's too big
  req.on('data', (data) => {
    buffer = Buffer.concat([buffer, data]);
    if (buffer.length > (5 * 1024 * 1024)) {
      res.status(400).send("File too large");
      req.destroy();
    }
  });

  // once we're done reading the image, upload it to firebase
  req.on('end', () => {
    // ensure we're either a jpeg or png
    const header = buffer.slice(0, 4).toString('hex');
    let type = null;
    if (header === '89504e47') { // \x89PNG
      type = 'image/png';
    }
    else if (header === 'ffd8ffe0') { // \xFF\xD8\xFF\xE0
      type = 'image/jpeg';
    }
    else {
      // all my homies hate webp
      res.status(400)
        .send("Images must be JPEG or PNG.");
      return;
    }

    // generate a uuid based on the md5 of the file
    const md5 = crypto.createHash('md5').update(buffer).digest('hex');

    // format like a uuid
    const uuid = `${md5.slice(0, 8)}-${md5.slice(8, 12)}-${md5.slice(12, 16)}-${md5.slice(16, 20)}-${md5.slice(20, 32)}`;
    const imageRef = sRef(storage, `images/${uuid}`);

    // throw the file at firebase
    uploadBytes(imageRef, buffer)
      .then(() => updateMetadata(imageRef, { contentType: type, customMetadata: { uuid } })) // store metadata
      .then(() => getDownloadURL(imageRef)) // yoink a download url
      .then((url) => {
        // send it back
        res.status(200).send({ url: url, id: uuid });
      })
      .catch((error) => {
        console.error(error);
        res.status(400).send(error);
      });
  });
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
  delete userData.password; // please god do not store this in the database in pain text
  const userRef = ref(database, `/users/${userId}`);
  set(userRef, userData)
    .then(() => {
      console.log(`User created successfully with id: ${userId}`);
      res.status(200).json({ id: userId });
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
    res.status(200).json({ id: id, ...userData });
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

app.post('/api/submit-recipe', (req, res) => {
  submitRecipe(req, res);
});

app.post('/api/submit-image', (req, res) => {
  submitImage(req, res);
});

/*
app.get('/api/search', (req, res) => {
  searchRecipe(req, res);
});
*/

app.get('/api/recipe', (req, res) => {
  getRecipe(req, res);
});

app.get('/api/recipeRandom', (req, res) => {
  getRandomRecipe(req, res);
});

app.get('/api/recipeAll', (req, res) => {
  getAllRecipes(req,res);
});

app.get('/api/recipeUserId', (req, res) => {
  getRecipeByUserId(req, res);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});