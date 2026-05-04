import fetch from 'node-fetch';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozOCwibmFtZSI6IkFsaWNlIiwidXNlcm5hbWUiOiJhbGljZTk5OSIsImVtYWlsIjoiYWxpY2VAZXhhbXBsZS5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTc3Nzg3OTc2NSwiZXhwIjoxNzc3OTY2MTY1fQ.PdxlEhkCGkMHe6XHYC9b8Zf_Gb_YyTUDLiGKT8tg4-0';

const response = await fetch('http://127.0.0.1:3000/api/v1/cats', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    cat_name: 'TestCat',
    owner: 38,
    weight: 5.2,
  }),
});

const data = await response.text();
console.log('Status:', response.status);
console.log('Response:', data);
