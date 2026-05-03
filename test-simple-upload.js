import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function testUpload() {
  const filePath = path.join(__dirname, 'test-image.png');
  
  if (!fs.existsSync(filePath)) {
    console.error('Test image not found at', filePath);
    process.exit(1);
  }

  const fileContent = fs.readFileSync(filePath);
  
  // Create multipart form data
  const boundary = '----FormBoundary' + Date.now();
  const filename = path.basename(filePath);
  
  const beforeFile = 
    `--${boundary}\r\n` +
    `Content-Disposition: form-data; name="file"; filename="${filename}"\r\n` +
    `Content-Type: image/png\r\n\r\n`;
  
  const afterFile = 
    `\r\n--${boundary}\r\n` +
    `Content-Disposition: form-data; name="name"\r\n\r\n` +
    `Test Cat\r\n` +
    `--${boundary}--\r\n`;

  const bodyBuffer = Buffer.concat([
    Buffer.from(beforeFile),
    fileContent,
    Buffer.from(afterFile)
  ]);

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/v1/cats',
    method: 'POST',
    headers: {
      'Content-Type': `multipart/form-data; boundary=${boundary}`,
      'Content-Length': bodyBuffer.length
    }
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log('Status Code:', res.statusCode);
        console.log('Response:', data);
        resolve();
      });
    });

    req.on('error', (error) => {
      console.error('Error:', error);
      reject(error);
    });

    req.write(bodyBuffer);
    req.end();
  });
}

console.log('Testing file upload...');
testUpload().then(() => {
  console.log('\n✓ Upload test completed');
  process.exit(0);
}).catch((error) => {
  console.error('✗ Upload test failed:', error);
  process.exit(1);
});
