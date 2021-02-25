class Budget {
   constructor(name, amount) {
      this.name = name
      this.amount = amount
   }

}
// handling of user interface tasks
class UI {

   static addTask(element) {
      const list = document.getElementById('myExpances');
      const row = document.createElement('div')
      row.classList.add('row')
      row.innerHTML = `<span>${element.name}: </span><span id="cat">${element.amount}  </span><button class="delete" >X</button>`;
      list.appendChild(row)
   }
   static clearTask() {
      document.getElementById('name').value = ""
      document.getElementById('amount').value = ""
   }

   static deleteTask(el) {
      if (el.classList.contains('delete')) {
         el.parentElement.remove();
      }
   }
   static showAlert(mesage, className) {
      let x = total.reduce((a, b) => a + b, 0)
      if (enter.value - x < 0) {
         const container = document.querySelector('.container')
         const alert = document.createElement('div')
         alert.className = `${className}`
         alert.appendChild(document.createTextNode(mesage))
         container.appendChild(alert)
         setTimeout(() => document.querySelector('.alert').remove(), 2000)
      }
   }
   static writeBalance(element) {
      const balance = document.getElementById('balance')
      total.push(Number(element.amount))
      let x = total.reduce((a, b) => a + b, 0)
      balance.innerHTML = '  ' + enter.value - x + ' $';

   }
   static updateBalance(Content) {
      total.forEach((text, index) => {
         let x = total.reduce((a, b) => a + b, 0)

         if (text == Content) {
            newTotal = total.splice(index, 1)
            let y = newTotal.reduce((a, b) => a + b, 0)
            balance.innerHTML = '  ' + enter.value - x + y + ' $';
         }
      })
   }
}

//event: view tasks
let total = []
let newTotal = []
let enter = document.getElementById('enter')
const budgetAdded = document.getElementById('budget')
document.getElementById('enterBtn').addEventListener('click', (e) => {
   e.preventDefault()
   budgetAdded.innerHTML = ` ${enter.value} $`
})

document.addEventListener('DOMContentLoaded', UI.displayBudget)

document.getElementById('task-form').addEventListener('submit', (e) => {
   e.preventDefault()
   const name = document.getElementById('name').value
   const amount = document.getElementById('amount').value
   const element = new Budget(name, amount)

   UI.addTask(element)
   UI.clearTask()
   UI.writeBalance(element)
   UI.showAlert('over budget', 'alert')

   document.querySelector('#myExpances').addEventListener('click', (e) => {
      UI.deleteTask(e.target)
      UI.updateBalance(e.target.parentNode.querySelector('#cat').textContent)
   })
})