import React, { useState } from 'react';
import axiosInstance from '../../apis/axiosClient';
import { useAuth } from '@akosasante/react-auth-context';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { user } = useAuth(); //use user.user.<whatever field we want> to access it properly

  const handleFileChange = (event) => {
    // Update the state with the selected file
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    // Check if a file is selected
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('userImage', selectedFile);

    try {
      // Send a POST request to the server with the file
      const response = await axiosInstance.post('/users/uploadUserImage', formData);

      if (response.ok) {
        // Handle successful upload
        alert('Profile picture updated successfully!');
      } else {
        // Handle errors
        console.log('Error occured');
        
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ImageUpload;


//later- check why alert is not being shown and check if it works ok 