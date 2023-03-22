import { useTodo } from '../context/todoContext'

function Footer() {
    const { todos } = useTodo()

    const finishedTasksCount = todos.reduce((total, todo) => {
        if (todo.isCompleted) {
            total += 1
        }
        return total
    }, 0)
    const todosCount = todos.length

    return (
        <>
            <div className='mt-4 flex items-center justify-between'>
                <h3 className='font-medium uppercase'>
                    {todosCount === 0
                        ? 'You are too lazy'
                        : `${finishedTasksCount} of ${todosCount} Task${
                              todosCount >= 2 ? 's' : ''
                          } completed`}
                </h3>
            </div>
        </>
    )
}

export default Footer
