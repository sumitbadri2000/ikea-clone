import { HEART_ADD_ITEMS } from "./heart.type"


let inintvalue={
    heartArr:[]
}

export let HeartReducer=(state=inintvalue,action) =>{

switch(action.type){

   case HEART_ADD_ITEMS:{
    return {
        ...state,heartArr:[...state.heartArr,action.payload]
    }
}




    default:{
        return state
    }
}


}