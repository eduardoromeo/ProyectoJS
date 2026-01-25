import { galleryData } from "../data/gallery.js";

export function renderHomePage(root){
    root.innerHTML = `
        <h1>Home - Galería</h1>
        <p>Bienvenido a la página principal EMT Producciones Audio Visuales</p>
        
        <h2 style="margin-top: 30px; margin-bottom: 15px; color: #333;">🖼️ Galería de Imágenes</h2>
        <div class="dashboard-buttons" style="margin-bottom: 15px;">
            <button class="gallery-btn" data-category="video" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 20px; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.3s;">🎬 Vídeo</button>
            <button class="gallery-btn" data-category="fotografia" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 12px 20px; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.3s;">📷 Fotografía</button>
            <button class="gallery-btn" data-category="mosaico" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 12px 20px; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.3s;">🎨 Mosaico</button>
            <button class="gallery-btn" data-category="bautizos" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; padding: 12px 20px; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.3s;">👶 Bautizos</button>
            <button class="gallery-btn" data-category="bodas" style="background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); color: white; padding: 12px 20px; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.3s;">💒 Bodas</button>
            <button class="gallery-btn" data-category="cumpleanos" style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); color: white; padding: 12px 20px; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.3s;">🎂 Cumpleaños</button>
            <button class="gallery-btn" data-category="graduaciones" style="background: linear-gradient(135deg, #d299c2 0%, #fef9d7 100%); color: white; padding: 12px 20px; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.3s;">🎓 Graduaciones</button>
        </div>
        <div id="gallery-container" class="gallery-container" style="background: #f5f5f5; border-radius: 10px; padding: 20px; min-height: 400px; display: flex; align-items: center; justify-content: center;">
            <p style="color: #999; font-size: 16px;">Selecciona una categoría para ver las imágenes</p>
        </div>
    `;

    // Añadir eventos a los botones de galería
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

    // Determine if it's video category to use video element
    const isVideo = category === 'video';
    const mediaTag = isVideo ? 'video' : 'img';
    const mediaAttributes = isVideo ? 'controls autoplay muted' : '';

    const slidesHTML = `
        <div class="slides-wrapper">
            <div class="slide">
                <${mediaTag} src="${images[currentIndex].src}" alt="${images[currentIndex].title}" class="slide-image" ${mediaAttributes}>
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
    const slideMedia = container.querySelector('.slide-image');
    const slideTitle = container.querySelector('.slide-title');
    const currentSlideSpan = container.querySelector('.current-slide');

    function updateSlide() {
        slideMedia.src = images[currentIndex].src;
        slideMedia.alt = images[currentIndex].title;
        slideTitle.textContent = images[currentIndex].title;
        currentSlideSpan.textContent = currentIndex + 1;
        if (isVideo) {
            slideMedia.load(); // Reload video for new src
        }
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