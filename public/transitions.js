document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function() {
        const fadeElements = document.querySelectorAll(".transition-fade");
        fadeElements.forEach(element => {
            element.classList.add("active");
        });
    }, 50);
});
