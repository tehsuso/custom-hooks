import { todoReducer } from "./todoReducer"
import { useEffect, useReducer } from "react"

            
const init = () => {
    return JSON.parse( localStorage.getItem('todos')) || []
}

export const useTodo = ( initialState = [] ) => {

    const [ todos, dispatch ] = useReducer ( todoReducer, initialState, init )
    
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify( todos ))
    }, [todos])
    
            
    const handleNewTodo = ( todo ) => {
        const action = {
            type: 'Add Todo',
            payload: todo
        }
        
        dispatch( action )
    }
    
    const handleDeleteTodo = ( id ) => {
        dispatch({
            type: 'Remove Todo',
            payload: id
        })   
    }
    
    const handleToggleTodo = ( id ) => {
        dispatch({
            type: 'Toggle Todo',
            payload: id,
        })
    }

    const todosCount = todos.length

    const PendingTodosCount = todos.filter(todo=> !todo.done).length

    return {
        todos,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
        todosCount,
        PendingTodosCount,
    }
}