import AdminContent from 'components/AdminContent';
import React from 'react'
import io from 'socket.io-client';

const Admin = () => {
  const socket = io.connect('http://localhost:5000')
  return (
    <AdminContent
      socket={socket}
    />
  )
}

export default Admin