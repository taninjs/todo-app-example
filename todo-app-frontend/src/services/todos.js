import axios from 'axios'

export const getTodos = () => {
  return axios.get('http://localhost:3030/todos/')
}

export const saveTodo = (text) => {
  return axios.post('http://localhost:3030/todos/', { text: text })
}

export const updateTodo = (todo) => {
  return axios.post(`http://localhost:3030/todos/${todo.id}/`, { text: })
}