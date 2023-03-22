import { useTodo } from '../context/todoContext'
import TodoDetails from './TodoDetails'

function TodoList() {
    const { todos } = useTodo()
    return todos.map(todo => (
        <div key={todo.id} className='bg-blue-400 mt-3 p-2 rounded-lg text-white'>
            <TodoDetails todo={todo} />
        </div>
    ))
}

export default TodoList
