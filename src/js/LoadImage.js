/* eslint-disable class-methods-use-this */
export default class LoadImage {
  constructor(container) {
    this.container = container;
    this.form = this.container.querySelector('.form');
    this.images = this.container.querySelector('.images');
    this.labelName = this.container.querySelector('.label-name');
    this.labelUrl = this.container.querySelector('.label-url');
  }

  init() {
    this.form.addEventListener('submit', (e) => this.checkImg(e));

    this.images.addEventListener('click', (event) => this.removeImg(event));
  }

  checkImg(e) {
    e.preventDefault();

    if (this.form.imgname.value === '') {
      this.addMistake(this.labelName, 'Заполните поле');
      return;
    }

    this.removeMistake();

    const img = document.createElement('img');
    img.src = this.form.url.value;
    img.onload = () => {
      this.addImg(this.form.url.value, this.form.imgname.value);
      this.form.reset();
      this.removeMistake();
    };
    img.onerror = () => this.addMistake(this.labelUrl, 'Изображение не найдено');
  }

  addMistake(el, mistake) {
    const div = document.createElement('div');
    div.classList.add('mistake');
    div.textContent = mistake;
    div.style.left = `${el.offsetWidth}px`;
    el.append(div);
  }

  addImg(url, name) {
    const div = document.createElement('div');
    div.classList.add('img-box');
    div.innerHTML = `<button class="btn">X</button><img src="${url}" alt="${name}" class="img">`;
    this.images.append(div);
  }

  removeImg(e) {
    if (e.target.classList.contains('btn')) {
      e.target.closest('.img-box').remove();
    }
  }

  removeMistake() {
    const mistake = this.container.querySelectorAll('.mistake');
    if (mistake) {
      mistake.forEach((el) => el.remove());
    }
  }
}
