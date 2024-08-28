function validateUserNameStart() {              
    let userName = document.getElementById('userName').value;
    let userNameError = document.getElementById("userNameError");

    userNameError.style.display = "none";

    let invalidStartRegex = /^[0-9\W]/;
    if (invalidStartRegex.test(userName)) {
        userNameError.textContent = "El nombre de usuario no puede comenzar con números y/o caracteres especiales.";
        userNameError.style.display = "block";
        return false; 
    }

    return true; 
}

function validateNumberCharactersUser(){
    let userName = document.getElementById('userName').value;
    let userNameError = document.getElementById("userNameError");

    userNameError.style.display = "none";

    if (userName.length < 8 || userName.length > 15) {
        userNameError.textContent = "El nombre de usuario debe tener entre 8 y 15 caracteres.";
        userNameError.style.display = "block";
        return false; 
    }

    return true;
}

function validateNumberCharactersPassword(){
    let password = document.getElementById('password').value;
    let passwordError = document.getElementById("passwordError");

    passwordError.style.display = "none";
    
    if (password.length < 12 || password.length > 20) {
        passwordError.textContent = "La contraseña debe tener entre 12 y 20 caracteres.";
        passwordError.style.display = "block";
        return false; 
    }

    return true;

}


function validatePassword(){
    let password = document.getElementById('password').value;
    let passwordError = document.getElementById("passwordError");

    passwordError.style.display = "none";

    let upperCase = /[A-Z]/;
    let lowerCase = /[a-z]/;
    let number = /[0-9]/;
    let special = /[!@#$%^&*(),.?":{}|<>]/;

    if (!upperCase.test(password)) {
        passwordError.textContent = "La contraseña debe incluir al menos una letra mayúscula.";
        passwordError.style.display = "block";
        return false;
    }

    if (!lowerCase.test(password)) {
        passwordError.textContent = "La contraseña debe incluir al menos una letra minúscula.";
        passwordError.style.display = "block";
        return false;
    }

    if (!number.test(password)) {
        passwordError.textContent = "La contraseña debe incluir al menos un número.";
        passwordError.style.display = "block";
        return false;
    }

    if (!special.test(password)) {
        passwordError.textContent = "La contraseña debe incluir al menos un caracter especial.";
        passwordError.style.display = "block";
        return false;
    }

    return true;
}


function register() {              
    let userName = document.getElementById('userName').value;
    let password = document.getElementById('password').value;
    let country = document.getElementById('country').value;
    let email = document.getElementById('email').value;


    let userNameError = document.getElementById("userNameError");
    let passwordError = document.getElementById("passwordError");

    if (userName.trim() === '' || password.trim() == '' || country.trim()== '' || email.trim()== '') {
        alert("Los campos no pueden permanecer en blanco")
        return;
    }

    if (!validateUserNameStart()) {
        return; 
    }

    if (userName.includes(' ')) {
        userNameError.textContent = "El nombre de usuario no puede contener espacios.";
        userNameError.style.display = "block";
        return;
    }

    if (!validateNumberCharactersUser()) {
        return; 
    }

    if (!validateNumberCharactersPassword()) {
        return; 
    }

    if (!validatePassword()) {
        return; 
    }

    console.log(userName)

    localStorage.setItem(userName, password);

    alert("Registro exitoso.");
    window.location.href = "home.html";
}

function login() {              
    let userName = document.getElementById('userName').value.trim();
    let password = document.getElementById('password').value.trim();

    let userNameError = document.getElementById("userNameError");
    let passwordError = document.getElementById("passwordError");
    let messageError = document.getElementById("messageError")

    let storedPassword = localStorage.getItem(userName);

    if (userName.trim()=== '' && password.trim()== '') {
        alert('Los campos no pueden permanecer vacios')
        return;
    }


    if (storedPassword !== null && storedPassword === password) {
        alert("Ingreso Exitoso");
        window.location.href = "home.html";
    } else {
        alert("Ingreso Invalido")
        messageError.textContent = "Ingreso Inválido, Verifica tu nombre de usuario y/o contraseña";
        messageError.style.display = "block";
    }

}