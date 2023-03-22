import { FiPlus } from 'react-icons/fi'
import { useTodo } from '../context/todoContext'

function AddTodo() {
    const { todo, inputChange, addTodo } = useTodo()

    return (
        <>
            <form onSubmit={addTodo}>
                <div className='flex justify-between gap-2'>
                    <div className='flex-1'>
                        <input
                            value={todo}
                            onChange={inputChange}
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
        </>
    )
}

export default AddTodo
