const tick = document.querySelectorAll('.custom-checkbox')
const goal = document.querySelectorAll('.goal-box')
const userAlert = document.querySelector('.user-alert')
const progressValue = document.querySelector('.progress-value')
const progressText = document.querySelector('.pregress-text')
const goalAlert = document.querySelector('.goal-alert')
const goalLaertquotes = ['Raise the bar by completing your goals!', 'only two goal left, keep going', 'Just a step away, keep going', 'wooh! you have completed all goals']





function updateprogressBar(){
    let userDataValues = Object.values(userData)
let filteredUserData = userDataValues.filter((curr) => {
    return curr.completed 
})
progressValue.style.width = `${(filteredUserData.length / 3) * 100}%`
progressText.textContent = `${filteredUserData.length}/3 completed`
goalAlert.textContent = goalLaertquotes[filteredUserData.length]
}

tick.forEach((curr, index) => {
    curr.addEventListener('click', () => {
        let allInputFilled = [...goal].every((inputFiled) => {
            return inputFiled.value
        })
        
        if (allInputFilled) {
            curr.classList.toggle('completed')

            if (goal[index]) {
            goal[index].classList.toggle('goal-box-after-completed');
            }


            if(curr.classList.contains('completed')){
                let nextInput = curr.nextElementSibling
                userData[nextInput.id].completed = !userData[nextInput.id].completed
                localStorage.setItem('userData', JSON.stringify(userData))
            }else{
                let nextInput = curr.nextElementSibling
                userData[nextInput.id].completed = !userData[nextInput.id].completed
                localStorage.setItem('userData', JSON.stringify(userData))
            }

                updateprogressBar()
                
        }
        else {
            userAlert.classList.remove('hide-uder-alert')
        }
    })
})

// for removing alert when user click on input field and storing value in localstorage
const userData = JSON.parse(localStorage.getItem('userData')) || {
    first: {
        goalName: '',
        completed: false
    },
    second:{
        goalName: '',
        completed: false
    },
    third:{
        goalName: '',
        completed: false
    }
}

goal.forEach((curr) => {
    curr.value = userData[curr.id].goalName

    if(userData[curr.id].completed){
        curr.previousElementSibling.classList.add('completed')
        curr.classList.add('goal-box-after-completed')
    }

    curr.addEventListener('focus', () => {
        userAlert.classList.add('hide-uder-alert')
    })
    
    curr.addEventListener('input', (e) => {
        if(userData[curr.id].completed){
            curr.value = userData[curr.id].goalName
            return 
        }

        userData[curr.id].goalName = e.target.value
        
        localStorage.setItem('userData', JSON.stringify(userData))
    })

})

updateprogressBar()



