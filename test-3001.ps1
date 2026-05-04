$login = @{
  username = "alice999"
  password = "password123"
} | ConvertTo-Json -Compress

$loginResponse = Invoke-RestMethod -Method Post -Uri "http://127.0.0.1:3001/api/v1/auth/login" -ContentType "application/json" -Body $login
$token = $loginResponse.token
$uid = $loginResponse.user.user_id

$catOutput = & curl.exe -sS -X POST "http://127.0.0.1:3001/api/v1/cats" `
  -H "Authorization: Bearer $token" `
  -F "cat_name=FreshPortTest" `
  -F "owner=$uid" `
  -F "weight=5.1"

Write-Output $catOutput
