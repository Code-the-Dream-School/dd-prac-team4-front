import React, { useState, useEffect } from 'react';
import {
  Typography,
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import axiosInstance from '../../apis/axiosClient';

const Forum = () => {
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null); // Добавлено состояние для выбранной комнаты

  const createRoom = async () => {
    try {
      const response = await axiosInstance.post('/forum/create-room', {
        name: roomName,
      });
      const newRoom = response.data;
      setRooms([...rooms, newRoom]);
      setRoomName('');
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axiosInstance.get('/forum/rooms');
        const roomData = response.data;
        setRooms(roomData);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  const selectRoom = async (roomId) => {
    try {
      const response = await axiosInstance.get(`/forum/rooms/${roomId}`);
      const roomData = response.data;
      setSelectedRoom(roomData);
    } catch (error) {
      console.error('Error selecting room:', error);
    }
  };

  return (
    <Container>
      <Typography
        variant="h3"
        style={{ fontWeight: 'bold', fontStyle: 'italic', margin: '1em 0' }}
      >
        Forum
      </Typography>
      <div>
        <TextField
          label="Room Name"
          variant="outlined"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          style={{ marginRight: '1em' }}
        />
        <Button variant="contained" color="primary" onClick={createRoom}>
          Create Room
        </Button>
      </div>
      <div>
        <List>
          {rooms.map((room) => (
            <ListItem
              key={room._id}
              button
              onClick={() => selectRoom(room._id)}
            >
              <ListItemText primary={room.name} />
            </ListItem>
          ))}
        </List>
      </div>
      <div>
        {selectedRoom && (
          <div>
            <Typography
              variant="h5"
              style={{ fontWeight: 'bold', margin: '1em 0' }}
            >
              {selectedRoom.name}
            </Typography>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Forum;
