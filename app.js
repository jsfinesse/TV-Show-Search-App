const form = document.querySelector("#searchForm");
const shelf = document.querySelector(".shelf");

form.addEventListener("submit", async function (e) {
    e.preventDefault();
    deleteImages();
    const searchTerm = form.elements.query.value;
    const config = { params: { q: searchTerm } };
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
    // console.log(res.data[0].show.url);
    displayImages(res.data);
    form.elements.query.value = "";
});

const displayImages = (shows) => {
    for (let result of shows) {
        if (result.show.image) {
            const link = document.createElement("a");
            link.href = result.show.url;
            link.target = "_blank";
            const img = document.createElement("img");
            img.src = result.show.image.medium;
            link.appendChild(img);
            shelf.appendChild(link);
        }
    }
};

const deleteImages = () => {
    const imgs = document.querySelectorAll("img");
    if (imgs.length === 0) return;
    for (let img of imgs) {
        img.remove();
    }
};
