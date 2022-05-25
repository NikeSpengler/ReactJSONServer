import React, { useState, Fragment } from 'react';
import { nanoid } from 'nanoid';
import './App.css';
import data from './data/db.json';
import ReadOnlyRow from './components/ReadOnlyRow';
import EditRow from './components/EditRow';

const App = () => {
  //State hooks
  const [  contacts, setContacts ] = useState(data);
  //Adding new data to the table
  const [addFormData, setAddFormData] =useState({
    fullName: '',
    address: '',
    phoneNumber: '',
    email: '',
  });

  const  [editFormData, setEditFormData] = useState({
    fullName: '',
    address: '',
    phoneNumber: '',
    email: '',
  })

  //If the editContactId is null, means that the user is not editing a row
  const [editContactId, setEditContactId] = useState(null);

  //Arrow function
  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;
    //...(using the spreadoperator to copy the existing form)
    const newFormData = { ...addFormData};
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  }

  //Arrow function for handle adding of a new contact in the table
  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      //nanoid helps us generate an id for us
      id: nanoid(),
      fullName: addFormData.fullName,
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,
    };
    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,

    }
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId );

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      fullName: contact.fullName,
      address: contact.address,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
    }
    setEditFormData(formValues);
  };

  //tabel for the JSON data
  return ( 
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Adress</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <Fragment>
                  { editContactId === contact.id ? (
                    <EditRow 
                      editFormData={editFormData} 
                      handleEditFormChange={handleEditFormChange}/>
                   ) : (
                   <ReadOnlyRow 
                    contact={contact} 
                    handleEditClick={handleEditClick}/>
                   )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      
      <h2>Add a Contact</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input 
          type="text" 
          name="fullName" 
          required="required" 
          placeholder='Enter a name...'
          onChange={handleAddFormChange}
        />
        <input 
          type="text" 
          name="address" 
          required="required" 
          placeholder='Enter a adress...'
          onChange={handleAddFormChange}
        />
        <input 
          type="text" 
          name="phoneNumber" 
          required="required" 
          placeholder='Enter a phone number...'
          onChange={handleAddFormChange}
        />
        <input 
          type="email" 
          name="email" 
          required="required" 
          placeholder='Enter an email...'
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default App;
