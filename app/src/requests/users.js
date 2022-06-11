import { axios, addAuth } from '~/util/axios'
import { localDb } from '~/main.js'

export async function login (email, password) {
  const res = await axios.post('/api/users/authorize', { email, password })
  await localDb.set({
    token: res.data.token,
    user: res.data.user || {},
    authStatus: 'in'
  })
  await addAuth(res.data.token)

  return res
}

export async function registerUser (payload) {
  const res = await axios.post('/api/users', payload)

  return res
}

export async function searchUsers () {
  const res = await axios.get('/api/users')

  return res
}
