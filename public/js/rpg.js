//// Let ou const ?

// Déjà, si vous vous posez la question de "est-ce que j'utilise var ?"
// la réponse est NON !

// Par défaut, à priori, on va préférer const. La question à se poser
// pour savoir si oui ou non je préfère let, c'est
// Dois-je changer le contenu de ma varible avec le temps ?
// Si oui -> let
// Dans tous les autres cas -> const

// Les fonctions

// L'ancienne syntaxe pour les écrire était
// const maFonction = function() {};
// On pourra les écrire désormais
// const maFonction = () => {};


const app = {
    gameOver: false,
    player: {
      x: 0,
      y: 0,
      direction: 'right'
    },
    targetCell: {
      x: 5,
      y: 3
    },
    generateCell: (x, y) => {
      // Je reçois la position x et y de la cellule en paramètres
      // Je peux donc refabriquer la cellule, exactement comme 
      // on le faisait dans la boucle for à l'origine
      const cellDiv = document.createElement('div');
      cellDiv.className = 'cell';
      // Je récupère les coordonnées x et Y de la cellule
      // que je suis en train de fabriquer
      // Je vérifie si la cellule que je fabrique correspond
      // soit à la cellule représentant ma targetCell
      // soit à mon player
      if (x === app.targetCell.x && y === app.targetCell.y) {
        // Je suis sur targetCell et je donne à la cellule
        // la class qu'il lui faut
        cellDiv.classList.add('targetCell')
      } else if (x === app.player.x && y === app.player.y) {
        // Je suis sur la cellule du jouer
        // Je crée une div avec la class "player"
        const playerDiv = document.createElement('div');
        playerDiv.className = 'player direction--' + app.player.direction;
        // Et je mets cette div dans ma cellule
        cellDiv.appendChild(playerDiv);
      }
      // Je renvoie la cellule fabriquée
      return cellDiv;
  
    },
    moveForward: () => {
      switch (app.player.direction) {
        case 'right':
          // Si je suis sur les 4 premières cases
          if (app.player.x < 5) {
            // Décaler la position x de 1
            app.player.x++;
          }
          break;
        case 'left':
          if (app.player.x > 0) {
            // Décaler la position x de -1
            app.player.x--;
          }
          break;
        case 'down':
          if (app.player.y < 3) {
            // Décaler la position y de 1
            app.player.y++;
          }
          break;
        case 'up':
          if (app.player.y > 0) {
            // Décaler la position y de -1
            app.player.y--;
          }
          break;
      }
    },
    turnLeft: () => {
      // Je veux donner une nouvelle valeur à player.direction
      // en fonction de sa direction actuelle
      switch (app.player.direction) {
        case 'right':
          app.player.direction = 'up';
          break;
        case 'up':
          app.player.direction = 'left';
          break;
        case 'left':
          app.player.direction = 'down';
          break;
        case 'down':
          app.player.direction = 'right';
          break;
      }
    },
    turnRight: () => {
      // Je veux donner une nouvelle valeur à player.direction
      // en fonction de sa direction actuelle
      switch (app.player.direction) {
        case 'right':
          app.player.direction = 'down';
          break;
        case 'up':
          app.player.direction = 'right';
          break;
        case 'left':
          app.player.direction = 'up';
          break;
        case 'down':
          app.player.direction = 'left';
          break;
      }
    },
    clearBoard: () => {
      app.boardZone.textContent = '';
    },
    redrawBoard: () => {
      app.clearBoard();
      app.drawBoard();
    },
    drawBoard: () => {
      // Je génère mes lignes
      for (let row = 0; row < 4; row++) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row';
        // Je veux créer 6 cellules à mettre dans rowDiv
        for (let cell = 0; cell < 6; cell++) {
          // Je crée ma div cell et lui donne la class "cell"
          const cellDiv = app.generateCell(cell, row);
          // Je mets ma cellule dans la ligne
          rowDiv.appendChild(cellDiv);
        }
        // Je rajoute ma ligne dans la div #board
        app.boardZone.appendChild(rowDiv);
      }
      app.isGameOver();
    },
    isGameOver: () => {
      // Je vérifie si la position du joueur
      // est celle de la div target
      if (app.player.x === 5 && app.player.y === 3) {
        app.gameOver = true;
        alert('Game over');
      }
    },
    onKeyPress: (evt) => {
      if (app.gameOver) {
        return;
      }
      console.log(evt);
      // Dans evt.code (ou .key) je sais quelle flèche est pressée
      switch (evt.code) {
        case 'ArrowLeft':
          app.turnLeft();
          break;
        case 'ArrowRight':
          app.turnRight();
          break;
        case 'ArrowUp':
          app.moveForward();
          break;
      }
      app.redrawBoard();
    },
    init: () => {
      // Je veux rajouter dans app une référence à ma div #board
      app.boardZone = document.querySelector('#board');
      // Ici je dessine le board
      app.drawBoard();
  
      document.addEventListener('keydown', app.onKeyPress);
    }
  };
  
  // Lorsque le DOM est prêt, exécuter app.init
  // app.init()
  
  document.addEventListener('DOMContentLoaded', app.init);