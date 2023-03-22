import AddTodo from './components/AddTodo'
import Footer from './components/Footer'
import TodoList from './components/TodoList'

function App() {
    return (
        <>
            <div className='mt-16'>
                <div className='py-4 text-center'>
                    <h1 className='text-4xl uppercase font-semibold'>Be more productive today</h1>
                </div>
                <div className='mx-auto max-w-lg p-3'>
                    <div className='bg-blue-400/40 p-4 rounded-xl shadow-lg'>
                        <AddTodo />
                        <TodoList />
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
