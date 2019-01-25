import fetch from 'cross-fetch';

export const selected_add = (selected) => ({
    type: 'ADD',
    selected
});

const BASE_URL = 'http://localhost:3000/api';

export const init = () => (dispatch) => {
    dispatch({type: 'FETCH_ENTITIES'});
    fetch(BASE_URL + '/getEntities')
        .then(res => {
            if (res.status >= 400) {
                throw new Error(res.json().toString())
            } else {
                return res.json()
            }
        }).then(entities => {
        let newEntities = [];
        for (let entity of entities) {
            newEntities.push(entity.data)
        }
        dispatch({type: 'GOT_ENTITIES', entities: newEntities})
    }).catch(err => console.error(err))
};

export const upload = (selected) => (dispatch) => {
    fetch("https://api.ipify.org/?format=jsonp&callback=?")
        .then(res => {
            if (res.status >= 400) {
                throw new Error(res.body);
            } else {
                return res.json().ip;
            }
        }).then(ip => {
        fetch(BASE_URL + '/addUser', {
            method: 'POST',
            body: JSON.stringify({ip, selected}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status >= 400) {
                throw new Error(res.json().toString())
            } else {
                dispatch({type: 'USER_ADD_SUCCESS'});
            }
        }).catch(err => console.error(err))
    }).catch(err => console.error(err))
};

export const getSummary = () => (dispatch) => {
    fetch(BASE_URL + "/getSummary")
        .then(res => {
            if (res.status >= 400) {
                throw new Error(res.body);
            } else {
                return res.json();
            }
        }).then(summary => {
        dispatch({type: 'GET_SUMMARY', summary})
    }).catch(err => console.error(err))
};
