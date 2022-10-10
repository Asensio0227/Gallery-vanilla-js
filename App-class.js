function getElement(selection) {
  const element = document.querySelector(selection);
  
  if (element) {
    return element;
  }

  throw new Error(`Please check ${selection} selected, no such element exist`);
}

class Gallery {
  constructor(element) { 
    this.container = element;
    this.list = [...element.querySelectorAll('.img')];
    // target
    this.modal = getElement('.modal');
    this.modalImages = getElement('.modal-images');
    this.modalImg = getElement('.main-img');
    this.imageName = getElement('.img-name');
    this.closeBtn = getElement('.close-btn');
    this.prevBtn = getElement('.prev-btn');
    this.nextBtn = getElement('.next-btn');
    // binds
    this.closeModal = this.closeModal.bind(this);
    this.prevPerson = this.prevPerson.bind(this);
    this.nextPerson = this.nextPerson.bind(this);
    this.chooseImage = this.chooseImage.bind(this);
    // event;
    this.container.addEventListener('click', function (e) {
      if (e.target.classList.contains('img')) {
        this.openModal(e.target, this.list);
      }
    }
      .bind(this)
    )
  };
  openModal(selectedImage, list) { 
    this.setMainImage(selectedImage);
    this.modalImages.innerHTML = list.map(function (image) {
      return `
      <img
      src="${image.src}"
      title="${image.title}"
      data-id="${image.dataset.id}"
      class="${selectedImage.dataset.id === image.dataset.id ? "modal-img selected" : "modal-img"
    }"
      />
      `
    })
      .join('');
    this.modal.classList.add('open');
    this.closeBtn.addEventListener('click', this.closeModal);
    this.prevBtn.addEventListener('click', this.prevPerson);
    this.nextBtn.addEventListener('click', this.nextPerson);
    this.modalImages.addEventListener('click', this.chooseImage);
  };
  setMainImage(selectedImage) {
    this.modalImg.src = selectedImage.src
    this.imageName.textContent = selectedImage.title;
  }
  closeModal() {
    this.modal.classList.remove('open');
    this.closeBtn.removeEventListener('click', this.closeModal);
    this.prevBtn.removeEventListener('click', this.prevPerson);
    this.nextBtn.removeEventListener('click', this.nextPerson);
    this.modalImages.removeEventListener('click', this.chooseImage);
  }
  nextPerson() { 
    const selected = this.modalImages.querySelector('.selected');
    const next = selected.nextElementSibling || this.modalImages.firstElementChild;
    selected.classList.remove('selected');
    next.classList.add('selected');
    this.setMainImage(next);
  }
  prevPerson() { 
    const selected = this.modalImages.querySelector('.selected');
    const prev = selected.previousElementSibling || this.modalImages.lastElementChild;
    selected.classList.remove('selected');
    prev.classList.add('selected');
    this.setMainImage(prev);
  }
  chooseImage(e) {
    if (e.target.classList.contains('modal-img')) {
      const selected = this.modalImages.querySelector('.selected');
      selected.classList.remove('selected');

      this.setMainImage(e.target);
      e.target.classList.add('selected');
    }
  }
}

const nature = new Gallery(getElement('.nature'));
const city = new Gallery(getElement('.city'));