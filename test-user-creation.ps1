$body = @{
  name = "TestAlice"
  username = "alice999"
  email = "alice@example.com"
  password = "password123"
} | ConvertTo-Json -Compress

Write-Host "Sending request with body: $body"
$response = Invoke-RestMethod -Method Post -Uri "http://127.0.0.1:3000/api/v1/users" -ContentType "application/json" -Body $body
Write-Host "Response: $response"
Write-Host "Success! User created with ID: $($response.user_id)"
