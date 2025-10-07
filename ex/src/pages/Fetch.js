import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Fetchfile() {
  const [users, setUsers] = useState([]);
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [editMode, setEditMode] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);

  useEffect(() => {
    fetchUsers();
  }, []); 

  const fetchUsers = () => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  };

  const handleSaveUser = () => {
    if (!username || !email || !phone) {
      alert('Please enter all fields.');
      return;
    }
    if (users.some(user => user.email === email && user.id !== editUserId)) {
      alert('Email already exists.');
      return;
    }
    if (editMode) {
      updateUser(editUserId);
    } else {
      createUser();
    }
    toggleModal();
  };

  const createUser = () => {
    const userData = { name: username, email: email, phone: phone };
    axios.post("https://jsonplaceholder.typicode.com/users", userData)
      .then(res => {
        setUsers([...users, res.data]);
        resetForm();
      })
      .catch(err => console.error(err));
  };

  const updateUser = (userId) => {
    axios.put(`https://jsonplaceholder.typicode.com/users/${userId}`, { name: username, email: email, phone: phone })
      .then(res => {
        const updatedUsers = users.map(user => (user.id === userId ? res.data : user));
        setUsers(updatedUsers);
        resetForm();
      })
      .catch(err => console.error(err));
  };

  const deleteUser = (userId) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(() => {
        const updatedUsers = users.filter(user => user.id !== userId);
        setUsers(updatedUsers);
      })
      .catch(err => console.error(err));
  };

  const handleEditUser = (userId) => {

    const selectedUser = users.find(user => user.id === userId);
    if (selectedUser) {
      setUsername(selectedUser.name);
      setEmail(selectedUser.email);
      setPhone(selectedUser.phone);
      setEditMode(true);
      setEditUserId(userId);
      toggleModal();
    }
  };

  const resetForm = () => {
    setUsername('');
    setEmail('');
    setPhone('');
    setEditMode(false);
    setEditUserId(null);
  };

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <Button color="warning" onClick={() => handleEditUser(user.id)}>Edit</Button>
                <Button color="danger" onClick={() => deleteUser(user.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button color="primary" onClick={toggleModal}>Add User</Button>

      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{editMode ? 'Edit User' : 'Add User'}</ModalHeader>
        <ModalBody>
          <div>
            <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Name' />
            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
            <input type='text' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Phone' />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => { toggleModal(); resetForm(); }}>Cancel</Button>
          <Button color="primary" onClick={handleSaveUser}>{editMode ? 'Update' : 'Save'}</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Fetchfile;
