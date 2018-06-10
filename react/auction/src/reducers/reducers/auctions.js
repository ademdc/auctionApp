const initialState = [
    {
        successful: false,
        failed:false,

    }
];


export default function auctions(state=initialState, action) {
    switch (action.type) {

        case 'AUCTION_POST_SUCCESSFUL':
        case 'BID_POST_SUCCESSFUL':
            return {...state, successful: true};

        case 'POSTING_FAILED':
        case 'BIDDING_FAILED':
        case 'AUTHENTICATION_ERROR':
            return {...state, failed: true};
        default:
            return state;
    }
}