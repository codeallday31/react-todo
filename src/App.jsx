import { useReducer, useRef } from 'react'
import { FiEdit, FiRefreshCw, FiTrash, FiX, FiPlus } from 'react-icons/fi'
import Button from './components/Button'

const TODO = {
    VALUE_CHANGE: 'value_change',
    ADD_TODO: 'add_todos',
    REMOVE_TODO: 'remove_todo',
    UPDATE_TODO: 'update_todo',
    EDIT_TODO: 'edit_todo',
    TOGGLE_FINISHED: 'toggle_finished_todo',
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
        case TODO.EDIT_TODO:
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if (todo.id === action.payload) {
                        return {
                            ...todo,
                            isEditMode: true,
                        }
                    }
                    return todo
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
                    }
                    return todo
                }),
            }
        case TODO.TOGGLE_FINISHED:
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if (todo.id === action.payload.id) {
                        return {
                            ...todo,
                            isCompleted: !todo.isCompleted,
                        }
                    }
                    return todo
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

    const finishedTasksCount = state.todos.reduce((total, todo) => {
        if (todo.isCompleted) {
            total += 1
        }
        return total
    }, 0)

    const handleSubmit = event => {
        event.preventDefault()
        dispatch({
            type: TODO.ADD_TODO,
            payload: {
                id: Math.floor(Math.random() * Date.now()).toString(16),
                name: state.todo,
                isEditMode: false,
                isCompleted: false,
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
            type: TODO.EDIT_TODO,
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

    const handleCompletedTodo = todoId => {
        dispatch({
            type: TODO.TOGGLE_FINISHED,
            payload: {
                id: todoId,
            },
        })
    }

    const renderedTodos = state.todos.map(todo => {
        return (
            <div key={todo.id} className='bg-blue-400 mt-3 p-2 rounded-lg text-white'>
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
                            onClick={() => handleCompletedTodo(todo.id)}
                        >
                            <span>{todo.name}</span>
                            {todo.isCompleted && (
                                <div className='absolute text-black w-full bg-black rounded-sm shadow-sm p-[1.5px]'></div>
                            )}
                        </div>
                    )}
                    <div className='flex gap-3'>
                        {!todo.isCompleted && (
                            <Button
                                onClick={() =>
                                    todo.isEditMode
                                        ? handleUpdateTodo(todo.id)
                                        : handleEditTodo(todo.id)
                                }
                            >
                                {todo.isEditMode ? <FiX /> : <FiEdit />}
                            </Button>
                        )}

                        <Button onClick={() => handleRemoveTodo(todo.id)}>
                            <FiTrash />
                        </Button>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <>
            <div className='mt-16'>
                <div className='py-4 text-center'>
                    <h1 className='text-4xl uppercase font-semibold'>Be more productive today</h1>
                </div>
                <div className='mx-auto max-w-lg p-3'>
                    <div className='bg-blue-400/40 p-4 rounded-xl shadow-lg'>
                        <form onSubmit={handleSubmit}>
                            <div className='flex justify-between gap-2'>
                                <div className='flex-1'>
                                    <input
                                        value={state.todo}
                                        onChange={handleChange}
                                        type='text'
                                        className='focus:outline-none focus:ring-blue-400 focus:ring-2 ring-1 p-2 ring-blue-400 rounded-md w-full transition duration-200'
                                    />
                                </div>
                                <button className='ring-1 px-3 text-white bg-blue-400 rounded-md'>
                                    <span className='flex items-center gap-2 '>
                                        <FiPlus />
                                    </span>
                                </button>
                            </div>
                        </form>
                        <div>{renderedTodos}</div>
                        <div className='mt-4 flex items-center justify-between'>
                            <h3 className='font-medium uppercase'>
                                {state.todos.length === 0
                                    ? 'You are too lazy'
                                    : `${finishedTasksCount} of ${state.todos.length} Task${
                                          state.todos.length >= 2 ? 's' : ''
                                      } completed`}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
