const mongoose = require('mongoose');

const atlas = process.env.atlas;
mongoose.connect(atlas, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
