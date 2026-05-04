Write-Host "=== TESTING LOGIN ===" -ForegroundColor Green

$login = @{
  username = "alice999"
  password = "password123"
} | ConvertTo-Json -Compress

try {
  $loginResponse = Invoke-RestMethod -Method Post -Uri "http://127.0.0.1:3000/api/v1/auth/login" -ContentType "application/json" -Body $login
  Write-Host "Login successful!" -ForegroundColor Green
  Write-Host "User: $($loginResponse.user | ConvertTo-Json)" -ForegroundColor Cyan
  $token = $loginResponse.token
  Write-Host "Token: $token" -ForegroundColor Yellow
  
  Write-Host "`n=== TESTING GET /ME (protected route) ===" -ForegroundColor Green
  $meResponse = Invoke-RestMethod -Method Get -Uri "http://127.0.0.1:3000/api/v1/auth/me" -Headers @{"Authorization" = "Bearer $token"}
  Write-Host "Protected route works!" -ForegroundColor Green
  Write-Host "Response: $($meResponse | ConvertTo-Json)" -ForegroundColor Cyan
  
  Write-Host "`n=== TESTING CAT CREATION ===" -ForegroundColor Green
  $catBody = @{
    cat_name = "TestCat"
    owner = 38
    weight = 5.2
  } | ConvertTo-Json -Compress
  
  $catResponse = Invoke-RestMethod -Method Post -Uri "http://127.0.0.1:3000/api/v1/cats" `
    -Headers @{"Authorization" = "Bearer $token"} `
    -ContentType "application/json" `
    -Body $catBody
  
  Write-Host "Cat created successfully!" -ForegroundColor Green
  Write-Host "Response: $($catResponse | ConvertTo-Json)" -ForegroundColor Cyan
  
  Write-Host "`n=== ALL TESTS PASSED ===" -ForegroundColor Green
  
} catch {
  Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}
