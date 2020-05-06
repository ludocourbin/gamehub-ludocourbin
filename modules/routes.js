const express = require('express');
const gamesArray = require('../games.json');


const router = express.Router();


router.get('/', (_, response) => {
	response.render('index', {
		'games': gamesArray,
	});
});


router.get('/:game', (request, response) => {
	const userGame = request.params.game;

	const isGame = gamesArray.find(game => {
		return game.name.toLowerCase() === userGame.toLowerCase();
	});

	if (!isGame) {
		response.status(404).send('Jeu non trouvé')
	}

	response.render(userGame, {
		'games': gamesArray,
	});	
});



module.exports = router;
