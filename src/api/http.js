import axios from 'axios'

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
  headers: { 'Content-Type': 'application/json' },
})

// Normaliza mensagens de erro vindas do Spring (validações, ResponseStatusException etc.)
http.interceptors.response.use(
  (res) => res,
  (error) => {
    const data = error.response?.data
    let message = 'Não foi possível concluir a operação.'

    if (typeof data === 'string' && data) message = data
    else if (data?.message) message = data.message
    else if (data?.error) message = data.error
    else if (error.code === 'ERR_NETWORK') message = 'Sem conexão com a API.'

    error.userMessage = message
    return Promise.reject(error)
  },
)

// Se um dia houver JWT (Spring Security), basta descomentar:
// http.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token')
//   if (token) config.headers.Authorization = `Bearer ${token}`
//   return config
// })
