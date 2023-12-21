import React, { useState} from 'react';
import './App.css';
import './index.css';



function App() {
  const [data, setData] = useState([]); // Array to store data for multiple files
  const [selectedFiles, setSelectedFiles] = useState([]); // Array to store multiple files
  
  const handleFileChange = (event) => {
    // Update the selected files when the user chooses files
    setSelectedFiles(Array.from(event.target.files));
  };

  const handleUpload = () => {
    // Check if files are selected before making the fetch requests
    if (selectedFiles.length > 0) {
      selectedFiles.forEach(file => {
        const formData = new FormData();
        formData.append('my_audio_file', file);
  
        // Make the fetch request with the FormData for each file
        fetch('http://localhost:5000/api/file_tempo', {
          method: 'POST',
          body: formData,
        })
        .then(response => response.json())
        .then(result => {
          setData(prevData => [...prevData, result]);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
      });
  
      // Clear the selected files after upload
      setSelectedFiles([]);
    } else {
      alert('Please select files before uploading.');
    }
  };

  return (
    <div className="App">
      <h1>Audio Processing App</h1>
      
      <div className="file-input-container">
        <input type="file" onChange={handleFileChange} multiple />
        <button className="upload-btn" onClick={handleUpload}>Upload Files</button>
      </div>
      
      {/* Table View */}
      <FileTable data={data} />

      {/* Card View of each of the Files */}
      {data.map((fileData, index) => (
        <FileInfoCard key={index} data={fileData} />
      ))}
    </div>
  );
  
}

// What the file will look like when they click upload
function FileInfoCard({ data }) {
  return (
    <div className="file-info-card">
      <h2>File Information</h2>
      <p>File Name: {data.filename}</p>
      <p>Overall Tempo: {data.overall_tempo}</p>
      <p>Peak #1: {data.peak_1}</p>
      <p>Peak #2: {data.peak_2}</p>
    </div>
  );
}


// Table view
function FileTable({ data }) {
  if (!data || data.length === 0) return <p>No files uploaded yet.</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>File Name</th>
          <th>Overall Tempo</th>
          <th>Peak #1</th>
          <th>Peak #2</th>
        </tr>
      </thead>
      <tbody>
        {data.map((file, index) => (
          <tr key={index}>
            <td>{file.filename}</td>
            <td>{file.overall_tempo}</td>
            <td>{file.peak_1}</td>
            <td>{file.peak_2}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}


export default App;
