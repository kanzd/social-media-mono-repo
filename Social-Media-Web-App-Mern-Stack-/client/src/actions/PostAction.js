import * as PostApi from '../api/PostRequest';

export const getTimelinePosts = (id,page,refresh=false) => async (dispatch) => {

    dispatch({ type: "RETRIEVING_START" });

    try {
        const { data } = await PostApi.getTimelinePosts(id,page);
        if(refresh){
            dispatch({ type: "REFRESH", data: data });
        }
        dispatch({ type: "RETRIEVING_SUCCESS", data: data });
    } catch (error) {
        console.log(error);
        dispatch({ type: "RETRIEVING_FAIL" });
    }
}