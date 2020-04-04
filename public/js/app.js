const weatherForm = document.querySelector('form')
const searchEl = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const location = searchEl.value
  if (!location) {
    return (messageOne.textContent = 'Please enter a location')
  }
  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''

  fetch('/weather?address=' + location, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error
      } else {
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
      }
    })
  })
})
