const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');


const app = express();
const upload = multer();


app.post('/extract', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });


    const data = await pdfParse(req.file.buffer);
    res.json({ text: data.text });
  } catch (err) {
    console.error('Error parsing PDF:', err);
    res.status(500).json({ error: 'Failed to parse PDF' });
  }
});


app.get('/', (req, res) => res.send('PDF to Text API is running.'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));