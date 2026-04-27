$ErrorActionPreference = "Stop"

Write-Host "Checking for Docker..."
if (!(Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Error "Docker is not installed or not in PATH. Please install Docker Desktop."
    exit 1
}

$composeCmd = "docker-compose"
if (docker compose version -ErrorAction SilentlyContinue) {
    $composeCmd = "docker compose"
} elseif (!(Get-Command docker-compose -ErrorAction SilentlyContinue)) {
    Write-Error "Docker Compose is not installed. Please install Docker Compose."
    exit 1
}

$envFile = ".env"

if (!(Test-Path $envFile)) {
    Write-Host "No .env file found. Let's create one."
    $spotifyClientId = Read-Host "Enter Spotify Client ID"
    $spotifyClientSecret = Read-Host "Enter Spotify Client Secret"
    $spotifyRedirectUri = Read-Host "Enter Spotify Redirect URI (e.g. http://localhost:3000/callback)"
    $spotifyRefreshToken = Read-Host "Enter Spotify Refresh Token"
    $slackUserToken = Read-Host "Enter Slack User Token (xoxp-...)"
    $slackSigningSecret = Read-Host "Enter Slack Signing Secret"
    $slackAppToken = Read-Host "Enter Slack App Token (xapp-...) [Optional, press enter to skip]"
    $dbRootPassword = Read-Host "Enter MySQL Root Password [Default: root]"
    $dbName = Read-Host "Enter MySQL Database Name [Default: spotify_bot]"
    $dbUser = Read-Host "Enter MySQL User [Default: bot_user]"
    $dbPassword = Read-Host "Enter MySQL Password [Default: bot_pass]"
    
    if (-not $dbRootPassword) { $dbRootPassword = "root" }
    if (-not $dbName) { $dbName = "spotify_bot" }
    if (-not $dbUser) { $dbUser = "bot_user" }
    if (-not $dbPassword) { $dbPassword = "bot_pass" }

    $envContent = @"
SPOTIFY_CLIENT_ID=$spotifyClientId
SPOTIFY_CLIENT_SECRET=$spotifyClientSecret
SPOTIFY_REDIRECT_URI=$spotifyRedirectUri
SPOTIFY_REFRESH_TOKEN=$spotifyRefreshToken
SLACK_USER_TOKEN=$slackUserToken
SLACK_SIGNING_SECRET=$slackSigningSecret
SLACK_APP_TOKEN=$slackAppToken

DB_ROOT_PASSWORD=$dbRootPassword
DB_NAME=$dbName
DB_USER=$dbUser
DB_PASSWORD=$dbPassword
PORT=3000
"@

    Set-Content -Path $envFile -Value $envContent
    Write-Host ".env file created successfully."
} else {
    Write-Host ".env file found."
}

Write-Host "Building Docker images if necessary and starting the stack..."
Invoke-Expression "$composeCmd -f docker/docker-compose.yml up --build -d"

if ($LASTEXITCODE -eq 0) {
    Write-Host "Stack started successfully! Run '$composeCmd -f docker/docker-compose.yml logs -f' to see logs."
} else {
    Write-Error "Failed to start the stack."
}
