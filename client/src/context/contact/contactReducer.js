import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR,
    GET_CONTACTS,
    CLEAR_CONTACTS
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload,
                loading: false
            }
        case ADD_CONTACT:
            return { 
                ...state, contacts: [...state.contacts, action.payload],  
                loading: false } //state is immutable so we have to take current state.contacts and add the payload

        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact => contact._id === action.payload._id ? action.payload : contact
                ),
                loading: false
            }

        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact._id !== action.payload),
                loading: false
            }
        case CLEAR_CONTACTS:
            return {
                ...state,
                contacts: null,
                filtered: null,
                error: null,
                current: null
            }
        case SET_CURRENT:
            return {
                ...state, current: action.payload
            }

        case CLEAR_CURRENT:
            return {
                ...state, current: null
            }
        case FILTER_CONTACTS:
            return {
                  ...state, 
                  filtered: state.contacts.filter(contact => {
                      const regex = new RegExp(`${action.payload}`, 'gi')  //the regular express is just going to be the text 'gi' is global and case insensitive
                      return contact.name.match(regex) || contact.email.match(regex) //matching against the regular expression of name or email
                    //  return (contact.name.indexOf(action.payload) > -1) || (contact.email.indexOf(action.payload) > -1);  *************This is what I came up with (may want to add toLowerCase)
                  })
            }
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            }
        case CONTACT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}