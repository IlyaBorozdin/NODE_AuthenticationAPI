/*
const BASE_URL = 'https://localhost:443'

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('#form');
    const errorText = document.querySelector('#errorText');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const req = Object.fromEntries(formData.entries());

        fetch(BASE_URL + '/api/user', {
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
                location.href = 'confirmation.html';
                return;
            })
            .catch((err) => {
                if (err.suggestions) {
                    errorText.innerHTML = err.suggestions.join('\n');
                    return;
                }

                errorText.innerHTML = err.userMessage;
                return;
            });        
    });
});
*/