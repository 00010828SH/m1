const petsContent = document.querySelector('.pets__content');

export const generatePets = (fullPetsList, cardsNumber, pets, pageNumber = 1) => {
	petsContent.innerHTML = '';
	// if (petsContent.getAttribute('data-page') === 'main') cardsNumber = Math.round(cardsNumber / 3);

	pageNumber--;
	for (let i = 0; i < cardsNumber; i++) {
		petsContent.append(generateCard(fullPetsList[pageNumber * cardsNumber + i], pets));
	}
};

export const generateCard = (petObj, pets) => {
	const pet = document.createElement('div');
	pet.classList.add('pets__card', 'pet');
	pet.setAttribute('data-index', `${pets.indexOf(petObj)}`);

	pet.innerHTML = `
      <img src="${petObj.img}" alt="${petObj.name}" class="pet__img">
      <h4 class="pet__name">${petObj.name}</h4>
      <button class="button-square button_secondary pet__button">Learn more</button>
   `;
	return pet;
};

export const sort6recursively = (list) => {
	const length = list.length;

	for (let i = 0; i < length / 6; i++) {
		const stepList = list.slice(i * 6, i * 6 + 6);

		for (let j = 0; j < 6; j++) {
			const duplicatedItem = stepList.find((item, ind) => {
				return item.name === stepList[j].name && ind !== j;
			});

			if (duplicatedItem !== undefined) {
				const ind = i * 6 + j;
				const which8OfList = Math.trunc(ind / 8);

				list.splice(which8OfList * 8, 0, list.splice(ind, 1)[0]);

				sort6recursively(list);
			}
		}
	}

	return list;
};
