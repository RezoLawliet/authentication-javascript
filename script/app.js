const authForm = document.querySelector('#auth-main')
const authEmail = document.querySelector('#email')
const authPass = document.querySelector('#password')

function invokeWarnNotification(errorType) {
    const warning = document.querySelector('#warning')
    warning.classList.remove('hidden')
    warning.innerHTML = ''
    const errorNotification = document.createElement('span')
    errorNotification.classList.add('error-notification')
    errorNotification.textContent = errorType
    warning.append(errorNotification)
}

function resolveWarnNotification() {
    const warning = document.querySelector('#warning')
    warning.classList.add('hidden')
}

function checkoutForm(form) {

    let permission = true
    
    const fields = form.querySelectorAll('input')

    for (const field of fields) {
        
        if(field.name == 'email' || field.name == 'password') {
            if(field.value == '' || field.value == null) {
                invokeWarnNotification("We couldn’t find an account matching the email and password you entered. Please check your email and password and try again.")
                permission = false
            }
        }
    }

    return permission
}

async function sendIntoServer(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        body: data,
    })
}

async function getFromServer(url) {
    const response = await fetch(url)
    const responseJson = await response.json()
    const data = await responseJson
    return data
}

authForm.addEventListener('submit', function(event) {
    event.preventDefault()
    if(checkoutForm(this)) {
        const authUser = new FormData(authForm)
        sendIntoServer('https://jsonplaceholder.typicode.com/posts', authUser)
        .then(() => {
            authForm.reset()
        })
        .catch(invokeWarnNotification("We're sorry, but we can't send data to the server. Please, try again later."))
        // const data = getFromServer('https://server')
        // if(authUser.email.value == data.Users.email && authUser.password.value == data.Users.password) { *Скорее всего это не правильно, но я пытался*
        //     window.location...
        // }
        // else {
        //     invokeWarnNotification("We couldn’t find an account matching the email and password you entered. Please check your email and password and try again.")
        // }
        resolveWarnNotification()
    }
})