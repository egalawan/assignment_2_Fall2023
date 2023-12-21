import React, { useState} from 'react';

function App() {
  const [data, setData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    // Update the selected file when the user chooses a file
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    // Check if a file is selected before making the fetch request
    if (selectedFile) {
      // Create a FormData object to handle file uploads
      const formData = new FormData();
      formData.append('my_audio_file', selectedFile);

      // Make the fetch request with the FormData
      fetch('http://localhost:5000/api/file_tempo', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((result) => {
          setData(result);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    } else {
      alert('Please select a file before uploading.');
    }
  };


  return (
    <div className="App">
      <h1>Audio Processing App</h1>
      
      {/* File Input */}
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload File</button>
      
      {/* Display Overall Tempo */}
      <p>File Name: {data.filename}</p>
      <p>Overall Tempo: {data.overall_tempo}</p>
      <p>Peak#1: {data.peak_1}</p>
      <p>Peak #2: {data.peak_2}</p>
      
      {/* Display other data as needed */}
    </div>
  );
}

export default App;
