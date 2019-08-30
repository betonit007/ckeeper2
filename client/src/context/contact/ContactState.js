import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
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


const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Get Contacts

const getContacts = async () => {
  try {
    const res = await axios.get('/api/contacts');

    dispatch({ type: GET_CONTACTS, payload: res.data })

  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response.msg
    })
  }
}

  // Add Contact
  const addContact = async contact => {
    const config = { //we're sending data so we must set headers with content type
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post('api/contacts', contact, config);

      dispatch({ type: ADD_CONTACT, payload: res.data })
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg })
    }

  };

  // Delete Contact
  const deleteContact = async id => {
    try {
      await axios.delete(`/api/contacts/${id}`);

      dispatch({ type: DELETE_CONTACT, payload: id})

    } catch (err) {
      
      dispatch ({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };
  // Clear Contacts
  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  }
  // Set Current Contact
  const setCurrent = contact => {

    dispatch({ type: SET_CURRENT, payload: contact })
  };

  // Clear Current Contact
  const clearCurrent = () => {

    dispatch({ type: CLEAR_CURRENT })
  };
  // Update Contact
  const updateContact = contact => {
    dispatch({ type: UPDATE_CONTACT, payload: contact })
  };
  // Filter Contacts
  const filterContacts = text => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  }
  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  }

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        getContacts,
        clearFilter,
        clearContacts

      }}
    >
      {props.children}
    </ContactContext.Provider>
  )
};

export default ContactState;

