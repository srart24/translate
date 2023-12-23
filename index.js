const express = require('express');
const { translate } = require('@vitalets/google-translate-api');
const app = express();
const port = 3000;

app.set('json spaces', 2);
app.use(express.json());

const defaultLang = 'id';

app.get('/', (req, res) => {
  res.status(200).json({ 
			status: true,
      creator: `@srart24`,
      code: 200,
      message: "Follow Instagram @srart24"
		});
}); 

app.get('/api', async (req, res) => {
  let { lang, text } = req.query;

  if ((lang || '').length !== 2) {
    lang = defaultLang;
    text = req.query.text;
  }

  if (!text) {
    return res.status(400).json({ creator: "@srart24", code: 400, error: 'Parameter text diperlukan' });
  }

  try {
    const result = await translate(text, { to: lang, autoCorrect: true });
    res.json({ creator: "@srart24", code: 200, result: result.text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, error: 'Terjadi kesalahan dalam proses terjemahan' });
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
