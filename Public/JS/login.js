// working of a checkbox

const check_box = document.getElementById('rememberme');
const rememberme_Label = document.getElementById('remembermeContent');


check_box.addEventListener('click', () => {
    rememberme_Label.classList.toggle('checkbox-checked');
});

// preventing form from reloading

//POST method implementation:
async function postData(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json();
}

const register_button = document.getElementById('register-submit');
const login_button = document.getElementById('login-submit');


register_button.addEventListener('click', (event) => {
    event.preventDefault();
    const register_email = document.getElementById('register_email').value;
    const register_password = document.getElementById('register_password').value;

    postData('/api/v1/auth/register', { register_email, register_password })
        .then(data => {
            if (data.success) {
                alert(`${data.msg}`);
            }
            else {
                alert(`${data.msg}`);
            }
        });

})

login_button.addEventListener('click', (event) => {
    event.preventDefault();
    const login_email = document.getElementById('login_email').value;
    const login_password = document.getElementById('login_password').value;

    postData('/api/v1/auth/login', { login_email, login_password })
        .then(data => {
            if (data.success) {
                alert("Logged in Successfully!");
            }
            else {
                alert(`${data.msg}`);
            }
        });

})
