export const polls = (state = {
    selected: [],
    nextEntity: [],
    nextIndex: 0,
    entities: [],
    summary: [],
    ip:'',
    exist: false
}, action) => {
    switch (action.type) {
        case 'ADD':
            return {
                ...state,
                selected: state.selected.concat([action.selected]),
                nextEntity: state.entities.length > state.nextIndex ? state.entities[state.nextIndex] : [],
                nextIndex: state.nextIndex+1
            };
        case 'FETCH_ENTITIES':
            return state;
        case 'GOT_ENTITIES':
            return {
                ...state,
                entities: action.entities,
                nextEntity: action.entities.length > state.nextIndex ? action.entities[state.nextIndex]:[],
                nextIndex: state.nextIndex+1
            };
        case 'GOT_IP':
            return {
                ...state,
                ip: action.ip
            };
        case 'GET_SUMMARY':
            return {
                ...state,
                summary: action.summary
            };
        case 'UPDATE_EXIST':
            return {
                ...state,
                exist: action.exist
            };
        default:
            return state
    }
};