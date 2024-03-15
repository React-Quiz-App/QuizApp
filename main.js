const app = require('./app');

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Request some pokemon pals at port ${PORT}`);
});
