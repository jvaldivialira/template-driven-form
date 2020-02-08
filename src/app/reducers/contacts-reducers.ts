const SET_CONTACTS = 'SET_CONTACTS';
function contactsReducer(state, action) {
    switch (action.type) {
        case SET_CONTACTS:
            state = action.payload;
            return state;
        default:
            return state
    }
}
export { contactsReducer, SET_CONTACTS };