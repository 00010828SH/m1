import { generatePets, generateCard, sort6recursively } from './petsContent.js';
import { PopUp } from './PopUp.js';

const contentWidth = window.innerWidth;
let cardsNumber = contentWidth >= 1280 ? 8 : contentWidth >= 768 ? 6 : 3;

let petsContent = document.querySelector('.pets__content');

// DOM Elements
const burger = document.querySelector('.burger');
const navBar = document.querySelector('.navigation');
const logo = document.querySelector('.header__logo');
// NavBar
const showNavBar = () => {
	burger.classList.toggle('burger-active');
	navBar.classList.toggle('navigation-active');
	logo.classList.toggle('logo-move');
	document.querySelector('body').classList.toggle('overflow-y');

	document.addEventListener('click', (e) => {
		if (e.target.closest('.burger') === burger) return;
		else if (navBar.classList.contains('navigation-active') && !e.target.classList.contains('navigation'))
			showNavBar();
	});
	console.log(fullPetsList);
};

burger.addEventListener('click', showNavBar);

// Pets Generation

let pets = []; // 8
let fullPetsList = []; // 48

fetch('../pets.json').then((res) => res.json()).then((list) => {
	pets = list;

	fullPetsList = (() => {
		let tempArr = [];
		for (let i = 0; i < 6; i++) {
			const newPets = pets;
			for (let j = pets.length; j > 0; j--) {
				let randInd = Math.floor(Math.random() * j);
				const randElem = newPets.splice(randInd, 1)[0];
				newPets.push(randElem);
			}
			tempArr = [ ...tempArr, ...newPets ];
		}
		return tempArr;
	})();

	fullPetsList = sort6recursively(fullPetsList);
	generatePets(fullPetsList, cardsNumber, pets);
});

// Pagination
const paginationFirstPage = document.querySelector('.pagination_first-page'),
	paginationPreviousPage = document.querySelector('.pagination_previous-page'),
	paginationPageNumber = document.querySelector('.pagination_page-number'),
	paginationNextPage = document.querySelector('.pagination_next-page'),
	paginationLastPage = document.querySelector('.pagination_last-page');

if (paginationPageNumber !== null) {
	const paginationButtons = () => {
		if (paginationPageNumber.textContent === '1') {
			paginationLastPage.classList.remove('pagination_inactive');
			paginationNextPage.classList.remove('pagination_inactive');
			paginationFirstPage.classList.add('pagination_inactive');
			paginationPreviousPage.classList.add('pagination_inactive');
		} else if (paginationPageNumber.textContent === `${48 / cardsNumber}`) {
			paginationLastPage.classList.add('pagination_inactive');
			paginationNextPage.classList.add('pagination_inactive');
			paginationFirstPage.classList.remove('pagination_inactive');
			paginationPreviousPage.classList.remove('pagination_inactive');
		} else {
			paginationLastPage.classList.remove('pagination_inactive');
			paginationNextPage.classList.remove('pagination_inactive');
			paginationFirstPage.classList.remove('pagination_inactive');
			paginationPreviousPage.classList.remove('pagination_inactive');
		}
		console.log(pets);
	};

	paginationFirstPage.addEventListener('click', (e) => {
		if (paginationFirstPage.classList.contains('pagination_inactive')) return;

		paginationPageNumber.textContent = '1';

		generatePets(fullPetsList, cardsNumber, pets);
		paginationButtons();
	});

	paginationPreviousPage.addEventListener('click', (e) => {
		if (paginationPreviousPage.classList.contains('pagination_inactive')) return;

		paginationPageNumber.textContent = `${+paginationPageNumber.textContent - 1}`;
		generatePets(fullPetsList, cardsNumber, pets, +paginationPageNumber.textContent);
		paginationButtons();
	});

	paginationNextPage.addEventListener('click', (e) => {
		if (paginationNextPage.classList.contains('pagination_inactive')) return;

		paginationPageNumber.textContent = `${+paginationPageNumber.textContent + 1}`;
		generatePets(fullPetsList, cardsNumber, pets, +paginationPageNumber.textContent);
		paginationButtons();
	});

	paginationLastPage.addEventListener('click', (e) => {
		if (paginationLastPage.classList.contains('pagination_inactive')) return;

		paginationPageNumber.textContent = `${48 / cardsNumber}`;
		generatePets(fullPetsList, cardsNumber, pets, 48 / cardsNumber);
		paginationButtons();
	});
}

// Pop Up
const generatePopUp = (e) => {
	const pet = e.target.closest('.pet');

	if (pet) {
		let popUp = new PopUp(pets[+pet.getAttribute('data-index')]);
		popUp.buildPopUp();
	}
}
petsContent.addEventListener('click', generatePopUp);

// Slider
const nextBtn = document.querySelector('.pets__right'),
	prevBtn = document.querySelector('.pets__left');
let slideNum = 0;
if (nextBtn !== null) {
	cardsNumber = Math.round(cardsNumber / 3);
	nextBtn.addEventListener('click', (e) => {
		petsContent = document.querySelector('.pets__content');
		slideNum = slideNum === fullPetsList.length / cardsNumber ? 1 : slideNum + 1;
		slideNum %= fullPetsList.length / cardsNumber;
		const newPetsContent = document.createElement('div');
		newPetsContent.classList.add('pets__content');
		newPetsContent.setAttribute('data-page', 'main');

		for (let i = 0; i < cardsNumber; i++) {
			newPetsContent.append(generateCard(fullPetsList[slideNum * cardsNumber + i], pets));
		}

		newPetsContent.style.transform = `translateX(${petsContent.offsetWidth}px)`;
		document.querySelector('.pets__container').append(newPetsContent);
		petsContent.style.transform = `translateX(-${petsContent.offsetWidth}px)`;
		newPetsContent.style.transform = `translateX(0px)`;
		setTimeout(() => document.querySelector('.pets__content').remove(), 1000);

		newPetsContent.addEventListener('click', generatePopUp);
	});

	prevBtn.addEventListener('click', (e) => {
		petsContent = document.querySelector('.pets__content');
		slideNum = slideNum === 0 ? fullPetsList.length / cardsNumber - 1 : slideNum - 1;
		slideNum %= fullPetsList.length / cardsNumber;
		const newPetsContent = document.createElement('div');
		newPetsContent.classList.add('pets__content');
		newPetsContent.setAttribute('data-page', 'main');

		for (let i = 0; i < cardsNumber; i++) {
			newPetsContent.append(generateCard(fullPetsList[slideNum * cardsNumber + i], pets));
		}

		newPetsContent.style.transform = `translateX(-${petsContent.offsetWidth}px)`;
		document.querySelector('.pets__container').prepend(newPetsContent);
		petsContent.style.transform = `translateX(${petsContent.offsetWidth}px)`;
		newPetsContent.style.transform = `translateX(0px)`;
		setTimeout(() => document.querySelectorAll('.pets__content')[1].remove(), 1000);
		newPetsContent.addEventListener('click', generatePopUp);
	});
}
