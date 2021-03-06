import { galleryContainer } from '../index.js'
// // Описан в документации
// import SimpleLightbox from 'simplelightbox';
// // Дополнительный импорт стилей
// import 'simplelightbox/dist/simple-lightbox.min.css';

export function renderPrimaryMurkup(response) {
    const galleryMarkup = response.hits.map(({ webformatURL, tags, likes, views, comments, downloads, largeImageURL }) => {
        return `<div class="photo-card">
                    <a href="${largeImageURL}">
                        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                    
                        <div class="info">
                            <p class="info-item">
                                <b>Likes</b>
                                <span>${likes}</span>
                            </p>
                            <p class="info-item">
                                <b>Views</b>
                                <span>${views}</span>
                            </p>
                            <p class="info-item">
                                <b>Comments</b>
                                <span>${comments}</span>
                            </p>
                            <p class="info-item">
                                <b>Downloads</b>
                                <span>${downloads}</span>
                            </p>
                        </div>
                    </a>    
                </div>`
    }).join('');
    galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

};