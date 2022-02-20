const axios = require('axios').default;

const KEY = '25768002-71b027491a8ffe255e9510da3';
const BASE_URL = 'https://pixabay.com/api/';
export const perPageValue = 40;

export async function getPictures(queryName, numberPage) {
    try {
        const response = await axios(`${BASE_URL}?key=${KEY}&q=${queryName}&image_type=photo&orientation=horizontal&safesearch=true&page=${numberPage}&per_page=${perPageValue}`);
        return response.data
    } catch (error) {
        console.log(error.message);
    }
};
