document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = this.querySelector('input[type="text"]').value.trim();
            const email = this.querySelector('input[type="email"]').value.trim();
            const message = this.querySelector('textarea').value.trim();

            if (name === '' || email === '' || message === '') {
                alert('Veuillez remplir tous les champs avant d’envoyer le message.');
            } else {
                alert('Merci ! Votre message a bien été envoyé.');
                this.reset();
            }
        });
    }
});
