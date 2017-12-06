import * as ACTION from '../constants/infura';

const initialState = {
    fetching: false,
    data: {
        eth_blockNumber: "N/n",
    },
    error: null
};

const infura = (state = initialState, action) => {
    switch (action.type) {
        case ACTION.ETH_BLOCKNUMBER_REQUEST:
            return {
                ...state,
                fetching: true,
            };
        case ACTION.ETH_BLOCKNUMBER_SUCCESS:
            return {
                ...state,
                fetching: false,
                data: {
                    eth_blockNumber: action.response.result
                },
            };
        case ACTION.ETH_BLOCKNUMBER_FAILURE:
            return {
                ...state,
                fetching: false,
                data: {},
                error: action.error
            };
        default:
            return state;
    }
};
export default infura;
