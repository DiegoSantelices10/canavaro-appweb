import AdminContent from 'components/AdminContent';
import React from 'react'
import io from 'socket.io-client';

const socket = io.connect('https://pizzacanavaro-socket.com')
const Admin = () => {
  return (
    <AdminContent
      socket={socket}
    />
  )
}

export default Admin