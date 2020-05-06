//select the parent of grid to add a button on top of it
const gridParent = document.getElementById('grid-parent');
const clearButton = document.getElementById('reset');
const inputNumberBoxes = document.getElementById('size');

//select the #grid div to append a grid of 16*16 square divs
const gridContainer = document.getElementById('grid');
const options = Array.from(document.querySelectorAll('.sketch-option button'));

console.log(options);

const appGrid = {
	grid: 600,
	boxes: 150,
	boxSixe: 16,
	theme: 'black',

	setTheme: function (e) {
		theme = e.target.id;
		const themeText = document.querySelector('#theme');
		if (theme == 'reset') {
			themeText.textContent = 'BLACK';
		} else {
			themeText.textContent = theme.toUpperCase();
		}
	},
	changeColor: function (event) {
		const cell = event.target;
		// dataOpacity = 0;
		switch (theme) {
			case 'random':
				cell.style.background = appGrid.generateRandomColor();
				break;
			case 'percent-increase':
				// Using a dataOpacity counter to increasca opacity
				cell.style.background = 'black';
				cell.dataOpacity += 0.1;
				cell.style.opacity = cell.dataOpacity;
			default:
				cell.style.background = 'black';
		}
	},

	//create the function that handle when I click on the clear button
	handleClearGrid: function () {
		//remove all the divs
		gridContainer.textContent = '';
		//call my function to recreate a div
		appGrid.handleReCreateGrid();
	},

	handleReCreateGrid: function () {
		//ask for a number that will will determine the number of row and column
		appGrid.boxSixe = inputNumberBoxes.value;
		//call my function that create a grid after having decided the number of boxes wanted
		appGrid.createGrid();
	},

	generateRandomColor: function () {
		var letters = '0123456789ABCDEF';
		var color = '#';
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	},

	createGrid: function () {
		//create 8 square divs
		for (let i = 0; i < appGrid.boxSixe; i++) {
			yDiv = document.createElement('div');
			gridContainer.appendChild(yDiv);
			//give them 8 children each
			for (let j = 0; j < appGrid.boxSixe; j++) {
				cell = document.createElement('div');

				cell.classList.add('grid--box');
				/* grid size divided by number asked = size of boxes */
				let sizeBox = appGrid.grid / appGrid.boxSixe;
				cell.style.width = `${sizeBox}px`;
				cell.style.height = `${sizeBox}px`;
				cell.dataOpacity = 0;

				//add an event listener to toggle a class on hover on all the boxes
				console.log(cell);
				cell.addEventListener('mouseover', appGrid.changeColor);
				yDiv.appendChild(cell);
			}
		}
	},
	//create grid on load page and listen to my clear button
	init: function () {
		appGrid.createGrid();
		clearButton.addEventListener('click', appGrid.handleClearGrid);
		inputNumberBoxes.addEventListener('change', appGrid.handleClearGrid);
		options.forEach((button) =>
			button.addEventListener('click', appGrid.setTheme)
		);
	},
};

appGrid.init();
