const axios = require("axios");

const API_KEY = "AIzaSyDxkpkZxbYD_AIL36aUauqm5gjIkG95B0w";

async function listModels() {
  try {
    const res = await axios.get(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`
    );

    res.data.models.forEach((model) => {
      console.log(model.name);
    });

  } catch (error) {
    console.error(error.response?.data || error.message);
  }
}

listModels();