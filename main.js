document.addEventListener('DOMContentLoaded', function() {
    const logo = document.getElementById('logo');
    const title = document.getElementById('title');

    function startAnimation() {
        anime({
            targets: logo,
            opacity: 0.5, 
            duration: 5000,
            complete: function() {
                title.style.display = 'block';
            }
        });
    }
    startAnimation();
});
