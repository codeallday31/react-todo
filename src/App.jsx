import { useReducer, useRef } from 'react'
import { FiEdit, FiRefreshCw, FiTrash, FiX } from 'react-icons/fi'

const TODO = {
    VALUE_CHANGE: 'value_change',
    ADD_TODO: 'add_todos',
    REMOVE_TODO: 'remove_todo',
    UPDATE_TODO: 'update_todo',
    TOGGLE_EDIT_MODE: 'toggle_edit_mode',
}

const todoReducer = (state, action) => {
    switch (action.type) {
        case TODO.VALUE_CHANGE:
            return {
                ...state,
                todo: action.payload,
            }
        case TODO.ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.payload],
                todo: '',
            }
        case TODO.REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload),
            }
        case TODO.TOGGLE_EDIT_MODE:
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if (todo.id === action.payload) {
                        return {
                            ...todo,
                            isEditMode: !todo.isEditMode,
                        }
                    } else {
                        return todo
                    }
                }),
            }
        case TODO.UPDATE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if (todo.id === action.payload.id) {
                        return {
                            ...todo,
                            name: action.payload.name,
                            isEditMode: false,
                        }
                    } else {
                        return todo
                    }
                }),
            }
        default:
            return state
    }
}

function App() {
    const [state, dispatch] = useReducer(todoReducer, {
        todo: '',
        todos: [],
    })
    const editedTodo = useRef()

    const handleSubmit = event => {
        event.preventDefault()
        dispatch({
            type: TODO.ADD_TODO,
            payload: {
                id: Math.floor(Math.random() * Date.now()).toString(16),
                name: state.todo,
                isEditMode: false,
            },
        })
    }

    const handleChange = event => {
        dispatch({
            type: TODO.VALUE_CHANGE,
            payload: event.target.value,
        })
    }

    const handleRemoveTodo = todoId => {
        dispatch({
            type: TODO.REMOVE_TODO,
            payload: todoId,
        })
    }

    const handleEditTodo = todoId => {
        dispatch({
            type: TODO.TOGGLE_EDIT_MODE,
            payload: todoId,
        })
    }

    const handleUpdateTodo = todoId => {
        dispatch({
            type: TODO.UPDATE_TODO,
            payload: {
                id: todoId,
                name: editedTodo.current.value,
            },
        })
    }

    const renderedTodos = state.todos.map(todo => {
        return (
            <div key={todo.id} className='bg-blue-400 mt-3 p-2 rounded-lg text-white'>
                <div className='flex items-center justify-between'>
                    {todo.isEditMode ? (
                        <input
                            defaultValue={todo.name}
                            ref={editedTodo}
                            type='text'
                            className='focus:outline-none focus:ring-blue-500 focus:ring-2 ring-1 ring-blue-400 p-2 rounded-sm w-96 transition duration-200 text-black'
                        />
                    ) : (
                        <span className='block'> {todo.name} </span>
                    )}
                    <div className='flex gap-3'>
                        <button
                            className='flex items-center border p-1 bg-indigo-300 rounded-md'
                            onClick={() =>
                                todo.isEditMode
                                    ? handleUpdateTodo(todo.id)
                                    : handleEditTodo(todo.id)
                            }
                        >
                            {todo.isEditMode ? <FiRefreshCw /> : <FiEdit />}
                        </button>
                        <button
                            className='flex items-center border p-1 bg-indigo-300 rounded-md'
                            onClick={() =>
                                todo.isEditMode
                                    ? handleEditTodo(todo.id)
                                    : handleRemoveTodo(todo.id)
                            }
                        >
                            {todo.isEditMode ? <FiX /> : <FiTrash />}
                        </button>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <>
            <div className='mx-auto mt-16 max-w-lg'>
                <div className='text-center py-4'>
                    <h1 className='text-4xl uppercase font-semibold'>Be more productive today</h1>
                </div>
                <div className='bg-blue-400/40 p-4 rounded-xl shadow-lg'>
                    <form onSubmit={handleSubmit}>
                        <div className='flex items-center justify-between'>
                            <div className='flex-1'>
                                <input
                                    value={state.todo}
                                    onChange={handleChange}
                                    type='text'
                                    className='focus:outline-none focus:ring-blue-500 focus:ring-2 ring-1 ring-blue-400 p-2 rounded-sm w-96 transition duration-200'
                                />
                            </div>
                            <button className='ring-1 p-2 text-white bg-blue-400 rounded-md'>
                                <span className='flex items-center gap-2'>Add Todo</span>
                            </button>
                        </div>
                    </form>
                    <div>{renderedTodos}</div>
                </div>
            </div>
        </>
    )
}

export default App
