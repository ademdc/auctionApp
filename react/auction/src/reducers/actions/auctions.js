export const postAuction = (owner_id, item, image, starting_bid, starting_time, ending_time) => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};
        let body = JSON.stringify({owner_id, item, image, starting_bid, starting_time, ending_time});

        return fetch("http://localhost:8000/auctions/", {headers, body, method: "POST"})
            .then(res => {
                if (res.status < 500) {
                    return res.json().then(data => {
                        return {status: res.status, data};
                    })
                } else {
                    console.log("Server Error!");
                    throw res;
                }
            })
            .then(res => {
                if (res.status === 200) {
                    dispatch({type: 'AUCTION_POST_SUCCESSFUL', data: res.data });
                    return res.data;
                } else if (res.status === 403 || res.status === 401) {
                    dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
                    throw res.data;
                } else {
                    dispatch({type: "POSTING_FAILED", data: res.data});
                    throw res.data;
                }
            })
    }
};