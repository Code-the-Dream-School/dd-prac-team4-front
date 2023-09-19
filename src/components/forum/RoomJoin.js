import React from 'react';

const RoomJoin = ({ handleJoinRoom }) => {
  return (
    <div>
      <input type="text" placeholder="Room ID" />
      <input type="text" placeholder="User ID" />
      <button onClick={handleJoinRoom}>Join Room</button>
    </div>
  );
};

export default RoomJoin;
