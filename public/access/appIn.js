const BASE_URL = 'https://localhost:443'

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('#form');
    const errorText = document.querySelector('#errorText');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const req = Object.fromEntries(formData.entries());

        fetch(BASE_URL + '/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return res.json().then((err) => Promise.reject(err));
            })
            .then((tokens) => {
                errorText.innerHTML = '';
                localStorage.setItem('accessToken', tokens.accessToken);
                location.href = BASE_URL + '/profile';
                return;
            })
            .catch((err) => {
                errorText.innerHTML = err.userMessage;
                return;
            });        
    });
});
