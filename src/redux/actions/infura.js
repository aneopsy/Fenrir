import {
    CALL_API
} from '../middleware/api';
import * as ACTION from '../constants/infura';

const SERVER = "https://kovan.infura.io/";

export const eth_blockNumber = () => {
    return {
        [CALL_API]: {
            endpoint: SERVER,
            init: {
                method: 'POST',
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    id: 1,
                    method: "eth_blockNumber",
                    params: [],
                }),
            },
            types: [
                ACTION.ETH_BLOCKNUMBER_REQUEST,
                ACTION.ETH_BLOCKNUMBER_SUCCESS,
                ACTION.ETH_BLOCKNUMBER_FAILURE,
            ],
        }
    };
};
