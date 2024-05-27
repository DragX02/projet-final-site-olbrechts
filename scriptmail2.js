const form = document.querySelector("form");
const fullName = document.getElementById("name");
const mail = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const mess = document.getElementById("message");

function sendEmail() {
    const bodyMessage = `Full name: ${fullName.value}<br>Email: ${mail.value}<br>Phone number: ${phone.value}<br>Message: ${mess.value}`;
    Email.send({
        SecureToken : "ba6abc53-cdc0-4b41-8ed3-24c0e256855a",
        To : 'dragx03@gmail.com',
        From : "dragx03@gmail.com",
        Subject : subject.value,
        Body : bodyMessage
    }).then(
        message => {
            if  (message == "OK") {
                Swal.fire({
                    title: "Bien joué!",
                    text: "Message envoyé!",
                    icon: "success"
                });
            }
        }
    );
}

function checkInputs() {
    const items = document.querySelectorAll(".item");

    for (const item of items) {
        if (item.value == "") {
            item.classList.add("error");
            item.parentElement.classList.add("error");
        }

        if (items[1].value != ""){
            checkEmail();
        }

        items[1].addEventListener("keyup", () => {
            checkEmail();
        });

        item.addEventListener("keyup", () => {
            if (item.value != "") {
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            }
            else {
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }
        });
    }
}

function checkEmail() {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const errortxtEmail = document.querySelector(".error-txt.mail");

    if (!mail.value.match(emailRegex)) {
        mail.classList.add("error");
        mail.parentElement.classList.add("error");

        if (mail.value != "") {
            errortxtEmail.innerText = "Entrer une adresse mail valide";
        }
        else {
            errortxtEmail.innerText = "Adresse mail est incorrecte!!!";
        }
    }
    else {
        mail.classList.remove("error");
        mail.parentElement.classList.remove("error");
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();

    if (!fullName.classList.contains("error") && !mail.classList.contains("error") && !phone.classList.contains("error") && !subject.classList.contains("error") && !mess.classList.contains("error")) {
        sendEmail();
        form.reset();
        return false;
    }
});