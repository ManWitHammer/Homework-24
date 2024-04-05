import postData from "./modules/postData.mjs"

const button1 = document.querySelector('.postBtn1')
const formed = document.querySelector('.formed')
const wellDone = document.querySelector('.wellDone')

const independent = async(e) => {
	
	e.preventDefault()
	button1.removeEventListener('click', independent)
	formed.insertAdjacentHTML('beforeend',
	`
	<form>
		<input type="text" name="name" placeholder="Введите имя">
		<input type="email" name="email" placeholder="Введите почту" /></br>
		<input type="password" name="password" placeholder="Введите пароль">
		<button class="createBtn">Создать</button>
	</form>
	`)
	const form = document.querySelector('form')
	document.querySelector('.createBtn').addEventListener('click', async(e) => {
		e.preventDefault()
		const data = new FormData(form)
		const user = {
			name: data.get('name'),
			email: data.get('email'),
			password: data.get('password'),
		}
		form.reset()
		const res = await postData('http://localhost:1487/usersData', user)
		wellDone.insertAdjacentHTML('beforeend',
		`
		<div class="infoblock">
			<p class="PText">был добавлен пользователь! Имя: ${res.name}</p>
		</div>
		`)
	})
}

button1.addEventListener('click', independent)
