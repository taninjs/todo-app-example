import React from 'react'
import axios from 'axios'

import styles from './TodoList.module.css'

import NewTodo from './components/NewTodo'
import Todo from './components/Todo'

class TodoList extends React.Component {
  state = {
    textValue: '',
    todos: []
  }

  componentDidMount = () => {
    axios.get('http://localhost:3030/todos/')
      .then((response) => {
        this.setState({
          todos: response.data.map(todo => ({
            id: todo.id,
            name: todo.text,
            ticked: todo.isCompleted
          }))
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleChange = e => {
    this.setState({
      textValue: e.target.value
    })
  }

  handleAdd = () => {
    if (!this.state.textValue) return

    let payload = {
      text: this.state.textValue
    }

    axios.post('http://localhost:3030/todos/', payload)
      .then(response => {
        this.setState(
          state => ({
            todos: state.todos.concat({
              ticked: response.data.isCompleted,
              name: response.data.text,
              id: response.data.id
            })
          }),
          () => {
            this.setState({ textValue: '' })
          }
        )
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleTick = idx => () => {
    let targetTodo = this.state.todos.find(x => x.id === idx)
    let payload = {
      text: targetTodo.name,
      isCompleted: !targetTodo.ticked
    }

    axios.put(`http://localhost:3030/todos/${idx}/`, payload)
      .then(() => {
        this.setState(state => ({
          todos: state.todos.map(todo =>
            todo.id === idx ? { ...todo, ticked: !todo.ticked } : todo
          )
        }))
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleDelete = idx => () => {
    axios.delete(`http://localhost:3030/todos/${idx}/`)
      .then(() => {
        this.setState(state => ({
          todos: state.todos.filter(todo => todo.id !== idx)
        }))
      })
      .catch(error => {
        console.log(error)
      })
  }

  render = () => {
    return (
      <div className={styles.Root}>
        <NewTodo
          textValue={this.state.textValue}
          onChange={this.handleChange}
          onAdd={this.handleAdd}
        />
        {this.state.todos.map(todo => (
          <Todo
            key={todo.id}
            ticked={todo.ticked}
            name={todo.name}
            onTick={this.handleTick(todo.id)}
            onDelete={this.handleDelete(todo.id)}
          />
        ))}
      </div>
    )
  }
}

export default TodoList
