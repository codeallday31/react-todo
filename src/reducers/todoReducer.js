import { TODO } from './actions'

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

export default todoReducer
