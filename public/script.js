const form = document.getElementById('loginForm');
const appData = document.getElementById('appData');
const errorMsg = document.getElementById('errorMsg');
const catFact = document.getElementById('catFact');
const getFactBtn = document.getElementById('getFact');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    errorMsg.innerHTML = '';

    let u = document.getElementById('username').value;
    let em = document.getElementById('email').value;
    let p1 = document.getElementById('password').value;
    let p2 = document.getElementById('confirmPassword').value;

    if (u.length < 4) {
        errorMsg.innerHTML = 'Nazwa użytkownika jest za krótka';
        return;
    }

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(em)) {
        errorMsg.innerHTML = 'Niepoprawny email';
        return;
    }

    if (p1.length < 8) {
        errorMsg.innerHTML = 'Hasło musi mieć minimum 8 znaków';
        return;
    }

    let passRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+]).+$/;
    if (!passRegex.test(p1)) {
        errorMsg.innerHTML = 'Hasło musi zawierać literę, cyfrę i znak specjalny';
        return;
    }

    if (p1 !== p2) {
        errorMsg.innerHTML = 'Hasła nie pasują do siebie';
        return;
    }

    form.style.display = 'none';
    appData.style.display = 'block';
    fetchCatData();
});

getFactBtn.addEventListener('click', fetchCatData);

async function fetchCatData() {
    try {
        let response = await fetch('/api/cats');
        let data = await response.json();
        
        if (response.status === 429) {
            catFact.innerHTML = data.error;
        } else {
            catFact.innerHTML = data.fact;
        }
    } catch (err) {
        catFact.innerHTML = 'Błąd pobierania danych';
    }
}
