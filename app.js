const form = document.querySelector('#searchForm');

form.addEventListener('submit', async function(e) {
    e.preventDefault();
    deleteImages();
    const searchTerm = form.elements.query.value;
    const config = { params : {q: searchTerm}};
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
    displayImages(res.data);
    form.elements.query.value = '';
})

const displayImages = (shows) => {
    for(let result of shows) {
        if(result.show.image) {
            const img = document.createElement('img');
            img.src = result.show.image.medium;
            document.body.append(img);
        }
    }
}

const deleteImages = () => {
    const imgs = document.querySelectorAll('img');
    if(imgs.length === 0) return;
    for(let img of imgs) {
        img.remove();
    }
}