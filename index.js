const express = require('express');
const axios = require('axios');
const fs = require('fs');
const app = express();
const PORT = 3002;

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Define a route to fetch cat facts from the Cat Facts API and save each fact to a file
app.get('/api/cat-facts', async (req, res) => {
  try {
    const response = await axios.get('https://catfact.ninja/fact');
    const fact = response.data.fact;

    // Append the fact to the 'cat-facts.txt' file
    fs.appendFile('cat-facts.txt', fact + '\n', (err) => {
      if (err) {
        console.error('Error writing to file:', err);
        res.status(500).json({ error: 'Failed to save cat fact' });
        return;
      }
      console.log('Cat fact saved to file.');
    });

    res.json({ fact });
  } catch (error) {
    console.error('Error fetching cat fact:', error);
    res.status(500).json({ error: 'Failed to fetch cat fact' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
