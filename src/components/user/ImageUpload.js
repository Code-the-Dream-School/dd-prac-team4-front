import React, { useState } from 'react';
import axiosInstance from '../../apis/axiosClient';
import { useAuth } from '@akosasante/react-auth-context';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
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
      const response = await axiosInstance.post(
        '/users/uploadUserImage',
        formData
      );
      // Handle successful upload
      setUploadStatus('Success');
      // Refresh the page

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      //AKOS: could you please take a look why does it throw an error if the img is being stored and when manually refresh the page it is shown correctly
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadStatus === 'Success' && (
        <p>Profile picture updated successfully!</p>
      )}
      {uploadStatus === 'Error' && <p>Error occurred during upload.</p>}
    </div>
  );
};

export default ImageUpload;

//later- check why alert is not being shown and check if it works ok
