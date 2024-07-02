import Config from "./src/db/db.config.js";
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import data from './data/data.json'  with { type: "json" };

// Function to fetch data from an API and save it to a JSON file using axios [338 pages: Taken 38]
Config.load();
const { TMDBDN_TOKEN } = process.env;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = '/data/data.json';
const filePath2 = '/data/cast.json';

async function fetchDataAndSaveToFile() {
  let jsonData = {
    data: []
  };
  for (let i = 39; i <= 64; i++) {
    console.log('Fetching data from page ' + i);
    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/discover/tv',
      params: {
        include_adult: 'false',
        include_null_first_air_dates: 'false',
        language: 'en-US',
        page: i.toString(),
        sort_by: 'popularity.desc',
        with_origin_country: 'KR',
        append_to_response: 'credits',
      },
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDBDN_TOKEN}`
      }
    };

    try {
      // Fetch data from the API using axios
      const response = await axios.request(options);
      const data = response.data;

      // Convert data to JSON string
      jsonData.data.push(data);
    } catch (error) {
      console.error(`Failed to fetch and save data: ${error.message}`);
    }
  }

  try {
    const fullPath = path.join(__dirname, filePath);
    jsonData = JSON.stringify(jsonData, null, 2);
    // Write the JSON data to a file
    fs.writeFile(fullPath, jsonData, (err) => {
      if (err) {
        throw err;
      }
      console.log(`Data saved to ${fullPath}`);
    });
  } catch (error) {
    console.error(`Failed to fetch and save data: ${error.message}`);
  }
}
async function fatchCastAndSaveToFile() {
  let jsonData = {
    data: []
  };
  for (const item of data.data) {
    for (const result of item.results) {
      console.log(`ID: ${result.id}, Name: ${result.name}`);
      const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/tv/${result.id}?append_to_response=credits&language=en-US`,
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${TMDBDN_TOKEN}`
        }
      };

      try {
        // Fetch data from the API using axios
        const response = await axios.request(options);
        const castData = {
          id: response.data.id,
          name: response.data.name,
          cast: response.data.credits.cast
        };

        // Convert data to JSON string
        jsonData.data.push(castData);
      } catch (error) {
        console.error(`Failed to fetch and save data: ${error.message}`);
      }
    }
  }

  try {
    const fullPath = path.join(__dirname, filePath2);
    jsonData = JSON.stringify(jsonData, null, 2);
    // Write the JSON data to a file
    fs.writeFile(fullPath, jsonData, (err) => {
      if (err) {
        throw err;
      }
      console.log(`Data saved to ${fullPath}`);
    });
  } catch (error) {
    console.error(`Failed to fetch and save data: ${error.message}`);
  }
}

// fetchDataAndSaveToFile();  //dramas
// fatchCastAndSaveToFile();  //cast info
