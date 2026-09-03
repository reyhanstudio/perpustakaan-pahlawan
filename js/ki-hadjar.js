document.addEventListener("DOMContentLoaded", () => {
    // 1. Fitur Highlight Presentasi
    const sections = document.querySelectorAll('.present-section');

    sections.forEach(section => {
        section.addEventListener('click', function(e) {
            if(e.target.tagName === 'IMG') return;
            sections.forEach(s => s.classList.remove('active-focus'));
            this.classList.add('active-focus');
        });
    });

    // 2. Fitur Lightbox/Zoom Gambar
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("zoomedImg");
    const closeBtn = document.getElementsByClassName("close-btn")[0];
    const images = document.querySelectorAll(".zoom-img");

    images.forEach(img => {
        img.addEventListener("click", function() {
            modal.style.display = "block";
            modalImg.src = this.src;
            modalImg.style.filter = "none"; 
        });
    });

    closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });

    modal.addEventListener("click", function(e) {
        if(e.target === modal) {
            modal.style.display = "none";
        }
    });
});