export const polls = (state = {
    selected: [],
    nextEntity: [],
    nextIndex: 0,
    entities: [],
    summary: []
}, action) => {
    switch (action.type) {
        case 'ADD':
            return {
                ...state,
                selected: state.selected.concat([action.selected]),
                nextEntity: state.entities.length > 0 ? state.entities[0] : [],
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
        case 'GET_SUMMARY':
            return {
                ...state,
                summary: action.summary
            };
        default:
            return state
    }
};