import { habits, setHabits, updateLocalStorage } from './data.js'


const themeToggle = document.getElementById('themeToggle')
const habitsContainer = document.getElementById('habitsContainer')
const removeHabitForm = document.getElementById('form')
const notRemove = document.querySelectorAll('.notRemove')
const removeHabit = document.getElementById('removeHabit')


const updateToggleBtn = () => {
  themeToggle.addEventListener('click', () => {
    themeToggle.innerText = themeToggle.innerText == 'dark_mode' ? 'light_mode' : 'dark_mode'
    document.body.classList.toggle('light_mode')
    localStorage.theme = themeToggle.innerText
  })
}

const updateTheme = () => {
  localStorage.theme == 'dark_mode' ? '' : document.body.classList.add('light_mode')
  themeToggle.innerText = localStorage.theme == 'dark_mode' ? 'dark_mode' : 'light_mode'
}


const getHabit = ({ name, daysCompleted }) => `
  <li>
    <div class="habit-info"><p class="habit-name">${name}</p><span class="habit-progress">Progress: ${daysCompleted}</span></div><button class="deleteHabit" type="button">Delete</button>
  </li>
`

const updateHabits = () => habitsContainer.innerHTML =
  habits.map(habit => getHabit(habit)).join('')

const updateDeleteBtn = () => {
  document.querySelectorAll('.deleteHabit').forEach((button, index) => {
    button.addEventListener('click', () => {
      window.scrollTo(0, 0)
      removeHabitForm.classList.add('openForm')
      document.body.style.overflow = "hidden"
      localStorage.removableHabit = index
    })
  })
}


notRemove.forEach(element => {
  element.addEventListener('click', () => {
    removeHabitForm.classList.remove('openForm')
    document.body.style.overflow = "hidden"
  })
})

removeHabit.addEventListener('click', () => {
  setHabits(habits.filter((habit) => habit.name != habits[localStorage.removableHabit].name))
  removeHabitForm.classList.remove('openForm')
  document.body.style.overflow = "auto"
  updateSettings()
})

const updateSettings = () => {
  updateLocalStorage()
  updateHabits()
  updateDeleteBtn()
  updateToggleBtn()
}

window.addEventListener('load', () => {
  updateHabits()
  updateTheme()
  updateDeleteBtn()
  updateToggleBtn()
}, false)
