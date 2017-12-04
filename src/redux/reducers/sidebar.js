import * as ACTION from '../constants/sidebar';

const initialState = {
    fetching: false,
    nav: [],
    error: null
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case ACTION.SIDEBAR_LIST_REQUEST:
            return {
                ...state,
                fetching: true,
            };
        case ACTION.SIDEBAR_LIST_SUCCESS:
            return {
                ...state,
                fetching: false,
                nav: action.response.nav,
            };
        case ACTION.SIDEBAR_LIST_FAILURE:
            return {
                ...state,
                fetching: false,
                error: action.error
            };
        default:
            return state;
    }
};
export default auth;
