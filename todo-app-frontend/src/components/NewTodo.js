import React from 'react'

import styles from './NewTodo.module.css'

function NewTodo(props) {
  const { textValue, onChange, onAdd } = props
  return (
    <div className={styles.Root}>
      <input
        className={styles.Input}
        placeholder="Enter Todo"
        value={textValue}
        onChange={onChange}
        onKeyDown={(e) => e.key === 'Enter' ? onAdd() : null }
      />
      <div className={styles.Button} onClick={onAdd}>
        ADD
      </div>
    </div>
  )
}

export default NewTodo
