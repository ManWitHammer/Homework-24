import getData from "./modules/getData.mjs"
import patchData from "./modules/patchData.mjs"

const block = document.querySelector('.container')

document.addEventListener('DOMContentLoaded', async(e) => {
    e.preventDefault()
    const products = await getData('http://localhost:1487/usersData')
    products.forEach(el => {
        block.insertAdjacentHTML('beforeend',
        `
        <div id="${el._id}" class="product">
            <p class="pipi1">Имя: ${el.name}</p>
            <p class="pipi2">Почта: ${el.email}</p>
            <p class="pipi3">Пароль: ${el.password}</p>
        </div>
        `)
    })
    const product = document.querySelectorAll('.product')
    product.forEach(el => {
        el.addEventListener('dblclick', async(e) => {
            const name = el.id
            const newName = prompt('Введите новое имя', el.querySelector('.pipi1').innerText.slice(5))
            const newEmail = prompt('Введите новый email', el.querySelector('.pipi2').innerText.slice(7))
            const newPassword = prompt('Введите новый пароль', el.querySelector('.pipi3').innerText.slice(8))
            const thisUser = {
                name: newName,
                email: newEmail,
                password: newPassword
            }
            await patchData('http://localhost:1487/usersData', name, thisUser)
        })
    })
})
