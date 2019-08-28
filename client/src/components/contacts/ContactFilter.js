import React, { useContext, useRef, useEffect } from 'react'; //UseRef - a way to reference an actual dom object
import ContactContext from '../../context/contact/contactContext';  

const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const text = useRef(''); // Intialize the useRef value of text - ('') nothing by default

    const { filterContacts, clearFilter, filtered } = contactContext;

    useEffect(() => {
      if(filtered === null) {
          text.current.value = '';
      }
    });

    const onChange = e => {
      if(text.current.value !== '') {  //text.current.value - gives us the actual value of the input
        filterContacts(e.target.value)
      } else {
          clearFilter();
      }
    }
    return (
        <form>
           <input 
             ref={text} 
             type='text' 
             placeholder="Filter Contacts..." 
             onChange={onChange} 
           />
        </form>
    )
}

export default ContactFilter
