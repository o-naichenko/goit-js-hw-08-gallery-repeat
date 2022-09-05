// +Створення і рендер розмітки по масиву даних і наданим шаблоном.
// +Реалізація делегування на галереї ul.js-gallery і отримання url великого зображення.
// +Відкриття модального вікна при натисканні на елементі галереї.
// Підміна значення атрибута src елемента img.lightbox__image.
// +Закриття модального вікна при натисканні на кнопку button[data-action="close-modal"].
// +Очищення значення атрибута src елемента img.lightbox__image.Це необхідно   для того,
//  + щоб при наступному відкритті модального вікна, поки вантажиться   зображення,
//    + ми не бачили попереднє.
import galleryItems from './gallery-items.js'

const galleryRef = document.querySelector('.gallery')
const modalRef = document.querySelector('.lightbox')
const modalImgRef = modalRef.querySelector('.lightbox__image')
const modalCloseBtnRef = document.querySelector('[data-action=close-lightbox]')

const galleryMarkup = galleryItems.map(createGalleryItemMarkup).join('')

function toggleModal() {
  modalRef.classList.toggle('is-open')
  modalImgRef.src = ''
}

function createGalleryItemMarkup({ preview, original, description }) {
  return `<li class="gallery__item">
  <a
    class="gallery__link"
    href=${original}
  >
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
      alt=${description}
    />
  </a>
</li>`
}

galleryRef.innerHTML = galleryMarkup

galleryRef.addEventListener('click', (e) => {
  e.preventDefault()
  const clickedImg = e.target
  toggleModal()
  modalImgRef.src = clickedImg.dataset.source
})

modalRef.addEventListener('click', (e) => {
  e.preventDefault()
  const target = e.target
  target === modalCloseBtnRef || target !== modalImgRef ? toggleModal() : null
})

window.addEventListener('keyup', (e) => {
  e.key === 'Escape' ? toggleModal() : null
})
