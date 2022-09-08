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
const modalOverlayRef = modalRef.querySelector('.lightbox__overlay')
const modalCloseBtnRef = document.querySelector('[data-action=close-lightbox]')
const imgPathAll = galleryItems.map((i) => i.original)
// console.log(ImgPathAll)
const galleryMarkup = galleryItems.map(createGalleryItemMarkup).join('')

galleryRef.innerHTML = galleryMarkup
window.addEventListener('click', openModal)

function openModal(e) {
  e.preventDefault()
  if (e.target.nodeName !== 'IMG') {
    return
  } else {
    modalRef.classList.add('is-open')
    modalImgRef.src = e.target.dataset.source
    window.addEventListener('keyup', toggleImg)
    window.addEventListener('keyup', closeModal)
    window.addEventListener('click', closeModal)
  }
}

function closeModal(e) {
  e.preventDefault()
  const { code, target } = e

  if (
    code === 'Escape' ||
    target === modalCloseBtnRef ||
    target === modalOverlayRef
  ) {
    modalRef.classList.remove('is-open')
    modalImgRef.src = ''
    window.removeEventListener('keyup', toggleImg)
    window.removeEventListener('keyup', closeModal)
    window.removeEventListener('click', closeModal)
  }
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

function toggleImg(event) {
  const code = event.code
  const currentIndex = imgPathAll.indexOf(modalImgRef.src)
  let nextIndex = currentIndex

  switch (code) {
    case 'ArrowLeft':
      currentIndex > 0 ? (nextIndex -= 1) : (nextIndex = imgPathAll.length - 1)
      break
    case 'ArrowRight':
      currentIndex < imgPathAll.length - 1 ? (nextIndex += 1) : (nextIndex = 0)
      break
    default:
      break
  }
  // check index to prevent error
  modalImgRef.src = imgPathAll[nextIndex]
}
