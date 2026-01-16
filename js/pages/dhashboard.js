import { galleryData } from "../data/gallery.js";

export function renderDashboardPage(root){
    root.innerHTML = `
        <h1>Dashboard - Galería</h1>
        <div class="dashboard-buttons">
            <button class="gallery-btn" data-category="video">Vídeo</button>
            <button class="gallery-btn" data-category="fotografia">Fotografía</button>
            <button class="gallery-btn" data-category="mosaico">Mosaico</button>
            <button class="gallery-btn" data-category="bautizos">Bautizos</button>
        </div>
        <div id="gallery-container" class="gallery-container">
            <p>Selecciona una categoría para ver las imágenes</p>
        </div>
    `;

    // Añadir eventos a los botones
    const buttons = root.querySelectorAll('.gallery-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const category = e.target.getAttribute('data-category');
            renderGallery(root, category);
        });
    });
}

function renderGallery(root, category) {
    const images = galleryData[category] || [];
    const container = root.querySelector('#gallery-container');
    
    if (images.length === 0) {
        container.innerHTML = '<p>No hay imágenes en esta categoría</p>';
        return;
    }

    let currentIndex = 0;

    const slidesHTML = `
        <div class="slides-wrapper">
            <div class="slide">
                <img src="${images[currentIndex].src}" alt="${images[currentIndex].title}" class="slide-image">
                <p class="slide-title">${images[currentIndex].title}</p>
            </div>
            <div class="slides-controls">
                <button class="prev-btn">❮ Anterior</button>
                <span class="slide-counter"><span class="current-slide">1</span> / <span class="total-slides">${images.length}</span></span>
                <button class="next-btn">Siguiente ❯</button>
            </div>
        </div>
    `;

    container.innerHTML = slidesHTML;

    const prevBtn = container.querySelector('.prev-btn');
    const nextBtn = container.querySelector('.next-btn');
    const slideImage = container.querySelector('.slide-image');
    const slideTitle = container.querySelector('.slide-title');
    const currentSlideSpan = container.querySelector('.current-slide');

    function updateSlide() {
        slideImage.src = images[currentIndex].src;
        slideImage.alt = images[currentIndex].title;
        slideTitle.textContent = images[currentIndex].title;
        currentSlideSpan.textContent = currentIndex + 1;
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateSlide();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateSlide();
    });
}