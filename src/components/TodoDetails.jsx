import { useRef } from 'react'
import { FiEdit, FiTrash, FiX } from 'react-icons/fi'
import { useTodo } from '../context/todoContext'
import Button from './Button'
import StrikeThrough from './StrikeThrough'

function TodoDetails({ todo }) {
    const { removeTodo, editTodo, updateTodo, toggleTaskCompleted } = useTodo()
    const editedTodo = useRef()

    return (
        <>
            <div className='flex justify-between gap-2 relative'>
                {todo.isEditMode ? (
                    <input
                        defaultValue={todo.name}
                        ref={editedTodo}
                        type='text'
                        className='focus:outline-none focus:ring-blue-500 focus:ring-2 ring-1 ring-blue-400 p-2 rounded-sm w-96 transition duration-200 text-black'
                    />
                ) : (
                    <div
                        className='cursor-pointer relative flex py-2 items-center'
                        onClick={() => toggleTaskCompleted(todo.id)}
                    >
                        <span>{todo.name}</span>
                        {todo.isCompleted && <StrikeThrough />}
                    </div>
                )}
                <div className='flex gap-3'>
                    {!todo.isCompleted && (
                        <Button
                            onClick={() =>
                                todo.isEditMode
                                    ? updateTodo(todo.id, editedTodo.current.value)
                                    : editTodo(todo.id)
                            }
                        >
                            {todo.isEditMode ? <FiX /> : <FiEdit />}
                        </Button>
                    )}

                    <Button onClick={() => removeTodo(todo.id)}>
                        <FiTrash />
                    </Button>
                </div>
            </div>
        </>
    )
}

export default TodoDetails
