import { combineReducers } from 'redux'

const initState = {
    // fetch_state:'',
    keyWord:'',
    list:[],
    loading:true,
}

function Reducer(state=initState, action) {
    switch (action.type) {
        case "INPUT_CHANGE":
            return Object.assign({},state,{ keyWord: action.value })
        case "GET_PRODECT":
            return Object.assign({},state,{ list: action.payload,loading:false })
        default:
            return state
    }
}


const rootReducer = combineReducers({
    State:Reducer
})

export default rootReducer