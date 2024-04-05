const home = document.querySelector('.Home')
const seeThat = document.querySelector('.See')
const createThat = document.querySelector('.Create')

const located = (home, seeThat, createThat) => {
    home.addEventListener('click', () => {
        window.location.href = '/main'
    })
    seeThat.addEventListener('click', () => {
        window.location.href = '/page1'
    })
    createThat.addEventListener('click', () => {
        window.location.href = '/page2'
    })
}

located(home, seeThat, createThat)
