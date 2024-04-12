const app = require('./app');

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Get some Trivia fun at port ${PORT}`);
});
