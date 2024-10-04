const express = require('express');
const router = express.Router();
const loginRouter = require('./routes/login');

app.use(express.json());
app.use('/login', loginRouter);

router.get('/', (req, res) => {
  res.send('Login page');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
