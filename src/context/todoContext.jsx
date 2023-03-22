import { createContext, useContext, useReducer } from 'react'
import { todoReducer, todoAction } from '../reducers'

const TodoContext = createContext()

function TodoProvider({ children }) {
    const [state, dispatch] = useReducer(todoReducer, {
        todo: '',
        todos: [],
    })

    const inputChange = event => {
        dispatch({
            type: todoAction.VALUE_CHANGE,
            payload: event.target.value,
        })
    }

    const addTodo = event => {
        event.preventDefault()
        dispatch({
            type: todoAction.ADD_TODO,
            payload: {
                id: Math.floor(Math.random() * Date.now()).toString(16),
                name: state.todo,
                isEditMode: false,
                isCompleted: false,
            },
        })
    }

    const removeTodo = todoId => {
        dispatch({
            type: todoAction.REMOVE_TODO,
            payload: todoId,
        })
    }

    const editTodo = todoId => {
        dispatch({
            type: todoAction.EDIT_TODO,
            payload: todoId,
        })
    }

    const updateTodo = (todoId, value) => {
        dispatch({
            type: todoAction.UPDATE_TODO,
            payload: {
                id: todoId,
                name: value,
            },
        })
    }

    const toggleTaskCompleted = todoId => {
        dispatch({
            type: todoAction.TOGGLE_FINISHED,
            payload: {
                id: todoId,
            },
        })
    }

    return (
        <TodoContext.Provider
            value={{
                ...state,
                inputChange,
                addTodo,
                removeTodo,
                editTodo,
                updateTodo,
                toggleTaskCompleted,
            }}
        >
            {children}
        </TodoContext.Provider>
    )
}

export const useTodo = () => {
    return useContext(TodoContext)
}

export { TodoProvider, TodoContext }
