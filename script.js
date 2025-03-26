const cards = document.getElementById('cards')
const box = document.getElementById('box')
const card = document.getElementById('card')
const input = document.getElementById('input')
const select = document.getElementById('select')


let users = []
const apiUrl= `https://randomuser.me/api/?results=100`

async function fetchUsers() {
    try{
    box.style.display= 'block'
    const response= await fetch(apiUrl)
    const data = await response.json()
    users = data.results
    displayUsers(users)
    }catch(error){
        console.log(`error`, error)
    }finally{
    box.style.display= "none"
    }
}

function displayUsers(usersToDisplay) {
    cards.innerHTML = ``  // Очищаем контейнер
    usersToDisplay.forEach(user => {
        const card = document.createElement('div')
        card.classList.add('card')
        card.innerHTML = `
            <img src="${user.picture.medium}" alt="Фото пользователя">
            <h2>${user.name.first} ${user.name.last}</h2>
            <p><strong>Возраст:</strong> ${user.dob.age}</p>
            <p><strong>Телефон:</strong> ${user.phone}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Город:</strong> ${user.location.city} ${user.location.country}</p>
        `
        cards.appendChild(card)
    })
}

function search() {
    const inputValue = input.value.trim().toLowerCase()
    const filteredUsers = users.filter(user => {
        const fullName = (user.name.first + ' ' + user.name.last).toLowerCase()
        return fullName.includes(inputValue)
    })

    if (filteredUsers.length > 0) {
        displayUsers(filteredUsers)
    } else {
        cards.innerHTML = `<p>Пользователи не найдены</p>`
    }
}


function filter(){
    let us = users
    if(select.value==='возраст'){
        us.sort((a,b)=> a.dob.age - b.dob.age)
    }else if(select.value==='именам'){
        us.sort((a,b)=> a.name.last.localeCompare(b.name.last))
    }else{
        console.log(`error`)
    }
    displayUsers(us)
}

fetchUsers()
select.addEventListener('input', filter)
input.addEventListener('input', search)
