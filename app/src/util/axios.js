import Axios from 'axios'
import { localDb, eventBus } from '~/main.js'
const isDevEnv = process.env.NODE_ENV === 'development'

Axios.interceptors.response.use(res => {
  // Process all success responses
  if (process.env.NODE_ENV === 'development') console.log('Hey look a success response: ', res)
  return res
}, async err => {
  // Process all error responses
  const error = processError(err)

  if (error && isDevEnv) {
    console.error('Err - Headers: ', error?.headers)
    console.error('Err - Status: ', error?.status)
    console.error('Err - Data: ', error?.data)
    console.error('Err - Message: ', error?.message)
  }

  if (error?.status === 401) {
    if (error?.data?.message === 'jwt expired') {
      if (isDevEnv) console.log('JWT is expired, needs to log back in')
      eventBus.emit('needToLogBackIn')
    }

    if (error?.data?.message === 'Missing Authorization') {
      if (isDevEnv) console.log('Missing token')
      eventBus.emit('needToLogBackIn')
    }
  }

  return Promise.reject(error)
})

function processError (err) {
  if (err.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    // console.log(error.response.data)
    // console.log(error.response.status)
    // console.log(error.response.headers)

    return err.response
  } else if (err.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    // console.log(error.request)

    return err.request
  } else {
    // Something happened in setting up the request that triggered an Error
    // console.log('Error', error.message)

    return err
  }
}

export async function addAuth (token) {
  Axios.defaults.headers.common.Authorization = `Bearer ${token}`
  return true
}

export async function clearAuth (isLogout = false, status = 'error') {
  await localDb.set({ token: '' })
  Axios.defaults.headers.common.Authorization = ''
  if (isLogout) {
    localDb.set({
      authStatus: 'out',
      token: '',
      user: null
    })
  } else {
    eventBus.emit('needToLogBackIn')

    localDb.set({
      authStatus: status,
      token: '',
      user: null
    })
  }

  return true
}

export const axios = Axios
