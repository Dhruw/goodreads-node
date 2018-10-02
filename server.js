const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const xmlParser = require('xml2json');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.json('database.users');
});

app.get('/search/:searchText/:page', (request, response) => {
	const {
		searchText,
		page
	} = request.params;

	axios.get('https://www.goodreads.com/search.xml?key=a2v63G5HQqqbWau8bjzdFA&q='+ searchText + '&page=' + page )
	.then(xmlBooks => {
		let jsonBooks = xmlParser.toJson( xmlBooks.data, {
			object: true,
			sanitize: true,
		});
		response.json(jsonBooks.GoodreadsResponse.search)
	})

});

const port_number = process.env.PORT || 3001;

app.listen(port_number);