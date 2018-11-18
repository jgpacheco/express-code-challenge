const mongoose = require('mongoose');
const app = require('./app');

const port = process.env.PORT || '3000';
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/bibliotech';

mongoose.connect(mongoURI, { useNewUrlParser: true });

// eslint-disable-next-line no-console
app.listen(port, () => console.log('Open http://localhost:3000 to see a response.'));
