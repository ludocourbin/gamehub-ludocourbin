const express = require('express');
const routes = require('./modules/routes');




const app = express();

app.use(routes);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.listen(3000, () => {
	console.log('Express started on port 3000');
});
