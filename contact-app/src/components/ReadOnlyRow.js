import React from 'react';

//Arrow function for adding new data to the table, also handling edit and delete button
const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
    return ( 
        <tr>
            <td>{contact.fullName}</td>
            <td>{contact.address}</td>
            <td>{contact.phoneNumber}</td>
            <td>{contact.email}</td>
            <td>
                <button 
                    type="button" 
                    onClick={(event) => handleEditClick(event, contact)}>Edit
                </button>
                
                <button 
                    type="button" 
                    onClick={() => handleDeleteClick(contact.id)}>Delete
                </button>
            </td>
        </tr>
     );
};
 
export default ReadOnlyRow;