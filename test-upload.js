import fetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

// Test file upload
const testUpload = async () => {
  const filePath = path.join(process.cwd(), 'test-image.png');
  
  if (!fs.existsSync(filePath)) {
    console.error('Test image not found');
    process.exit(1);
  }

  const form = new FormData();
  form.append('file', fs.createReadStream(filePath));
  form.append('name', 'Test Cat');

  try {
    console.log('Uploading file...');
    const response = await fetch('http://localhost:3000/api/v1/cats', {
      method: 'POST',
      body: form
    });

    const data = await response.json();
    console.log('Response status:', response.status);
    console.log('Response data:', data);
    
    if (response.ok) {
      console.log('\n✓ File uploaded successfully!');
      console.log('Check public/uploads folder for the uploaded file and thumbnail.');
    } else {
      console.log('\n✗ Upload failed');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};

testUpload();
