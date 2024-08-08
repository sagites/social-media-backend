const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const ErrorResponse = require('./utils/errorResponse');
const cors = require('cors');
require('dotenv').config({ path: './configs/.env' });
require('colors');

// db config
const dbConfig = require('./configs/dbConfig');

dbConfig();

const app = express();
const PORT = process.env.PORT || 3000;

// app config
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// routes config
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');
const jobRouter = require('./routes/job');
const contactRouter = require('./routes/contact');

app.use('/api/v1/blogs', blogRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/jobs', jobRouter);
app.use('/api/v1/contact', contactRouter);

app.get('**', (req, res, next) => {
	return next(new ErrorResponse(`NOT FOUND`, 404));
});

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`App Started on ${PORT}`.yellow);
});
