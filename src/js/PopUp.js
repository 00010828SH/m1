export class PopUp {
	constructor(petObj) {
		this.pet = petObj;
		this.overlay = '';
		this.popUp = '';
		this.popUpContent = '';
		this.closeBtn = '';
	}
	buildPopUp() {
		this.overlay = document.createElement('div');
		this.overlay.classList.add('overlay');

		this.popUp = document.createElement('div');
		this.popUp.classList.add('pop-up');

		this.closeBtn = document.createElement('button');
		this.closeBtn.classList.add('button-rounded', 'pop-up__cancel');
		this.closeBtn.innerHTML = `
         <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.42618 6.00003L11.7046 1.72158C12.0985 1.32775 12.0985 0.689213 11.7046 0.295433C11.3108 -0.0984027 10.6723 -0.0984027 10.2785 0.295433L5.99998 4.57394L1.72148 0.295377C1.32765 -0.098459 0.68917 -0.098459 0.295334 0.295377C-0.0984448 0.689213 -0.0984448 1.32775 0.295334 1.72153L4.57383 5.99997L0.295334 10.2785C-0.0984448 10.6723 -0.0984448 11.3108 0.295334 11.7046C0.68917 12.0985 1.32765 12.0985 1.72148 11.7046L5.99998 7.42612L10.2785 11.7046C10.6723 12.0985 11.3108 12.0985 11.7046 11.7046C12.0985 11.3108 12.0985 10.6723 11.7046 10.2785L7.42618 6.00003Z" fill="#292929"/>
         </svg>
      `;

		this.popUpContent = document.createElement('div');
		this.popUpContent.classList.add('pop-up__content');
		this.popUpContent.innerHTML = `
         <img src="${this.pet.img}" alt="${this.pet.name}" class="pop-up__img">

         <div class="pet-information">
            <h3 class="pet-name">${this.pet.name}</h3>
            <h4 class="pet-breed">${this.pet.type} - ${this.pet.breed}</h4>
            <h5 class="pet-description">${this.pet.description}</h5>
            <ul class="pet-properties">
               <li class="pet-age"><b>Age: </b>${this.pet.age}</li>
               <li class="inoculations"><b>Inoculations: </b>${this.pet.inoculations}</li>
               <li class="diseases"><b>Diseases: </b>${this.pet.diseases}</li>
               <li class="parasites"><b>Parasites: </b>${this.pet.parasites}</li>
            </ul>
         </div>
      `;

		this.appendPopUpElements();

		this.bindEvents();

		this.openPopUp();
	}

	appendPopUpElements() {
		this.popUp.append(this.closeBtn);
		this.popUp.append(this.popUpContent);
		this.overlay.append(this.popUp);
	}

	bindEvents() {
      this.closeBtn.addEventListener('click', this.closePopUp)
      this.overlay.addEventListener('click', this.closePopUp)
   }

	openPopUp() {
      document.querySelector('body').append(this.overlay);
      document.querySelector('body').classList.add('overflow-y');
   }

	closePopUp(e) {
      // debugger
      // let classes=e.target.classList;
      if(e.target.classList.contains('overlay') || e.target.closest('.pop-up__cancel') && document.querySelector('.overlay'))
         document.querySelector('.overlay').remove();
         document.querySelector('body').classList.remove('overflow-y');
   }
}
