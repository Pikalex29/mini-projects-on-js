function slidesPlugin(slideActive = 0) {
    const slides = document.querySelectorAll('.slide')

    slides[slideActive].classList.add('active')

    for (const slide of slides) {
        slide.addEventListener('click', function () {
            clearActiveClasses()

            slide.classList.add('active')
        })
    }

    function clearActiveClasses() {
        for (const slide of slides) {
            slide.classList.remove('active')
        }
    }
}

slidesPlugin(3)