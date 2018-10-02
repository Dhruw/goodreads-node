const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const xmlParser = require('xml2json');
const cors = require('cors');
const temp = require('./temp.json');
const app = express();



app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.json('database.users');
});

app.get('/search/:searchText', (request, response) => {
	const {
		searchText
	} = request.params;

	// response.json(temp.GoodreadsResponse.search);

	axios.get('https://www.goodreads.com/search.xml?key=a2v63G5HQqqbWau8bjzdFA&q='+ searchText )
	.then(xmlBooks => {
		let jsonBooks = xmlParser.toJson( xmlBooks.data, {
			object: true,
			sanitize: true,
		});
		response.json(jsonBooks.GoodreadsResponse.search)
	})


});


app.listen(3001);