import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

function goToast (text = 'This is a message!', options) {
  Toastify({
    text,
    duration: 4000,
    // destination: 'https://github.com/apvarun/toastify-js',
    newWindow: false,
    close: true,
    gravity: 'top', // `top` or `bottom`
    position: 'right', // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: 'linear-gradient(to right, var(--color-blue-300), var(--color-blue-700))'
    },
    ...options
  }).showToast()
}

export default {
  info (text, options) {
    return goToast(text, options)
  },
  warning (text, options) {
    return goToast(text, {
      style: {
        background: 'linear-gradient(to right, var(--color-orange-500), var(--color-orange-700))'
      },
      duration: 6000,
      ...options
    })
  },
  error (text, options) {
    return goToast(text, {
      style: {
        background: 'linear-gradient(to right, var(--color-red-300), var(--color-red-700))'
      },
      duration: 6000,
      ...options
    })
  }
}
