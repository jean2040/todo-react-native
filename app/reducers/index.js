import { combineReducers } from 'redux';

import { TODO_AVAILABLE, DELETE_TODO, UPDATE_TODO, ADD_TODO } from "../actions/" //Import the actions types constant we defined in our actions

let dataState = { data: [], loading:true };

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case ADD_TODO: {
            let todos = cloneObject(state.todos); //clone current state
            todos.unshift(action.todo); //add to the top
            state = Object.assign({}, state, {todos: todos});
            return state;
        }

        case TODO_AVAILABLE:{
            state = Object.assign({},state,{todos:action.todos, loading: false});
            return state;
        }
        case UPDATE_TODO:{
            let todo = action.todo;
            let todos =  cloneObject(state.todos) //clone the current state
            let index = getIndex(todos, todo.id); //find the index of the quote with the quote id passed
            if (index !== -1) {
                todos[index]['title'] = todo.title;
                todos[index]['description'] = todo.description;
            }
            state = Object.assign({}, state, { todos: todos});
            return state;
        }

        case DELETE_TODO:{
            let todos =  cloneObject(state.todos); //clone the current state
            let index = getIndex(todos, action.id); //find the index of the quote with the id passed
            if(index !== -1) todos.splice(index, 1);//if yes, undo, remove the QUOTE
            state = Object.assign({}, state, { todos: todos});
            return state;
        }
        default:
            return state;
    }
};

function cloneObject(object){
    return JSON.parse(JSON.stringify(object));
}

function getIndex(data, id){
    let clone = JSON.parse(JSON.stringify(data));
    return clone.findIndex((obj) => parseInt(obj.id) === parseInt(id));
}

// Combine all the reducers
const rootReducer = combineReducers({
    dataReducer
    // more reducers
})

export default rootReducer;