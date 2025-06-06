const authReducer = (
    state = { authData: null, loading: false, error: false, updateLoadng: false },
    action
) => {
    switch (action.type) {
        case "AUTH_START":
            return { ...state, loading: true, error: false };
        case "AUTH_SUCCESS":
            localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
            localStorage.setItem("token", action.data.token);
            return { ...state, authData: action.data, loading: false, error: false,errorData:null };
        case "AUTH_FAIL":
            return { ...state, loading: false, error: true,errorData:action.data };
        case "UPDATING_START":
            return { ...state, updateLoadng: true, error: false };
        case "UPDATING_SUCCESS":
            let tempActionData = JSON.parse(JSON.stringify(action?.data))
            tempActionData.user.following = tempActionData.user.following.filter((value)=>value!=='')
            tempActionData.user.followers = tempActionData.user.followers.filter((value)=>value!=='')
            localStorage.setItem("profile", JSON.stringify({ ...tempActionData }));
            localStorage.setItem("token", action.data.token);
            return { ...state, authData: tempActionData, updateLoadng: false, error: false };
        case "UPDATING_FAIL":
            return { ...state, updateLoadng: false, error: true };


        case 'UPDATE_USER_DETAILS':
            const tempState = JSON.parse(JSON.stringify(state))
            tempState.authData.user.following = action.data.following.filter((value)=>value!=='')
            tempState.authData.user.followers = action.data.followers.filter((value)=>value!=='')
            localStorage.setItem("profile", JSON.stringify({ ...tempState.authData }));
            return { ...state,authData:tempState.authData }
        case "FOLLOW_USER":
            return { ...state, authData: { ...state.authData, user: { ...state.authData.user, following: [...state.authData.user.following, action.data] } } }
        case "UNFOLLOW_USER":
            return { ...state, authData: { ...state.authData, user: { ...state.authData.user, following: [...state.authData.user.following.filter((personId) => personId !== action.data)] } } }
        case "LOG_OUT":
            localStorage.clear();
            return { ...state, authData: null, loading: false, error: false };
        default:
            return state;
    }
};


export default authReducer