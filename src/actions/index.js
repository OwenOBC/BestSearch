import axios from "axios";

export function inputAction(val){
    return {
        type:"INPUT_CHANGE",
        value:val
    }
}

export function requestAction (keyWord){
    return async (dispatch) => {
      var res = await axios.post(
            '/api/interview/keyword_search',
            {
                "login_token":"INTERVIEW_SIMPLY2021",
                "search_phrase": keyWord
            });
            const action = {
                type: 'GET_PRODECT',
                payload:res.data.data.product_trends//res.data.data[0][0]
            }    
            dispatch(action); 
    }
}
