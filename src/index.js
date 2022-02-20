import './css/styles';
import { renderPrimaryMurkup } from './js/renderPrimaryMurkup.js';
import { getPictures, perPageValue } from './js/getPictures.js';
import { Notify } from 'notiflix';

const searchFormInput = document.querySelector('#search-form > input');
const searchFormButton = document.querySelector('#search-form > button');
const loadMoreBtn = document.querySelector('.load-more')
export const galleryContainer = document.querySelector('.gallery')

let queryName = null;
let numberPage = 1;
loadMoreBtn.classList.add("load-more-hidden");

searchFormInput.addEventListener('input', (e) => {
    e.preventDefault();
    queryName = e.target.value.trim();
});

searchFormButton.addEventListener('click', (e) => {
    e.preventDefault();
    loadMoreBtn.classList.add("load-more-hidden");
    cleanGalleryContainer();
    if (queryName) {
        numberPage = 1;

        getPictures(queryName, numberPage).then(response => {
            renderPrimaryMurkup(response);
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
});

loadMoreBtn.addEventListener('click', (e) => {
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

        }).catch(e => console.log(e))
    }
});

function cleanGalleryContainer() {
    galleryContainer.innerHTML = '';
};

    