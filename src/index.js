import './css/styles';
import { renderPrimaryMurkup } from './js/renderPrimaryMurkup.js';
import { getPictures, perPageValue } from './js/getPictures.js';
import { Notify } from 'notiflix';
// Описан в документации
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchFormInput = document.querySelector('#search-form > input');
const searchFormButton = document.querySelector('#search-form > button');
const loadMoreBtn = document.querySelector('.load-more')
export const galleryContainer = document.querySelector('.gallery')

const lightboxOptions = {
    overlayOpacity: 1,
    captions: true,
    captionsData: 'alt',
    captionPosition: 'top',
};
let queryName = null;
let numberPage = 1;
let gallery = null;
loadMoreBtn.classList.add("load-more-hidden");

searchFormInput.addEventListener('input', (e) => {
    e.preventDefault();
    queryName = e.target.value.trim();
});
//--------------------
searchFormButton.addEventListener('click', onSearchSubmit);

loadMoreBtn.addEventListener('click', onLoadMore);

function onSearchSubmit (e) {
    e.preventDefault();
    loadMoreBtn.classList.add("load-more-hidden");
    cleanGalleryContainer();
    if (queryName) {
        numberPage = 1;

        getPictures(queryName, numberPage).then(response => {
            renderPrimaryMurkup(response);
            gallery = new SimpleLightbox('.gallery a', lightboxOptions).refresh(); 
            if (response.hits.length === 40) {
                loadMoreBtn.classList.remove("load-more-hidden");
            };
            if (response.hits.length === 0) {
                Notify.failure('"Sorry, there are no images matching your search query. Please try again."')
            } else {
                Notify.success(`Hooray! We found ${response.totalHits} images.`);
            };
        }).catch(e => console.log(e))
    }
}

function onLoadMore (e) {
    e.preventDefault();
    if (queryName) {
        numberPage += 1;
        
        getPictures(queryName, numberPage).then(response => {
            const totalPages = Math.ceil(response.totalHits / perPageValue);
            if (numberPage === totalPages) {
                Notify.warning('We\'re sorry, but you\'ve reached the end of search results.');
                loadMoreBtn.classList.add("load-more-hidden");
            }
            renderPrimaryMurkup(response);
            gallery = new SimpleLightbox('.gallery a', lightboxOptions).refresh(); 

        }).catch(e => console.log(e))
    }
}

function cleanGalleryContainer() {
    galleryContainer.innerHTML = '';
};
