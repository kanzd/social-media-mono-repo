const postReducer = (
    state = { posts: [], loading: false, error: false, uploading: false,currentPost:[] },
    action
) => {
    switch (action.type) {
        case "UPLOAD_START":
            return { ...state, uploading: true, error: false }
        case "UPLOAD_SUCCESS":
            return { ...state, posts: [action.data, ...state.posts], uploading: false, error: false }
        case "UPLOAD_FAIL":
            return { ...state, uploading: false, error: true }


        // belong to Posts.js
        case "RETRIEVING_START":
            return { ...state, loading: true, error: false }
        case "RETRIEVING_SUCCESS":
            return { ...state, posts: [...state.posts,...action.data], loading: false, error: false,currentPost:action.data }
        case "RETRIEVING_FAIL":
            return { ...state, loading: false, error: true }
        case "REFRESH":
            return { ...state,posts:action.data,loading: false, error: true }
        case "RESET_POST":
            return { ...state, posts: [],loading: false, error: false,currentPost:[] }
        case "UPDATE_REDUCER":
            return { ...state, posts: action.data,loading: false, error: false,currentPost:action.data }
        default:
            return state
    }
}

export default postReducer