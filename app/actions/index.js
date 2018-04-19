export const TODO_AVAILABLE = 'TODO_AVAILABLE';
export const ADD_TODO = 'ADD_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';

import {AsyncStorage} from 'react-native';

export function addToDo(todo){
    return (dispatch)=>{
        AsyncStorage.getItem('data',(err, todos)=> {
            if (todos !== null ){
                todos = JSON.parse(todos);
                todos.unshift(todo); // add a new to-do to the top
                AsyncStorage.setItem('data', JSON.stringify(todos),()=>{
                    dispatch({type:ADD_TODO,todo:todo});
                });
            }
        });
    }
}

export function getTodos(){
    return (dispatch) => {

        AsyncStorage.getItem('data',(err,todos)=>{
            if (todos !==null ){
                dispatch({type:TODO_AVAILABLE, todos:JSON.parse(todos)})
            }
        });

    };
}


export function updateTodo(todo){
    return (dispatch) => {
        AsyncStorage.getItem('data',(err,todos)=>{
            if (todos !== null){
                todos = JSON.parse(todos);
                var index = getIndex(todos, todo.id); //find the index of the TO-DO passed
                if(index !== -1) {
                    todos[index]['title'] = todos.title;
                    todos[index]['description'] = todos.description
                }
                AsyncStorage.setItem('data', JSON.stringify(todos), () =>{
                    dispatch({type:UPDATE_TODO, todo:todo});
                });
            }
        });
    }
}

export function deleteTodo(id){
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, todos) => {
            if (todos !== null){
                todos = JSON.parse(todos);

                var index = getIndex(todos, id); //find the index of the quote with the id passed
                if(index !== -1) todos.splice(index, 1);//if yes, undo, remove the TO-DO
                AsyncStorage.setItem('data', JSON.stringify(todos), () => {
                dispatch({type: DELETE_TODO, id:id});
                });
            }
        });
    };
}

function getIndex(data, id){
    let clone = JSON.parse(JSON.stringify(data));
    return clone.findIndex((obj) => parseInt(obj.id) === parseInt(id));
}