#!/bin/bash
set -e

echo "Checking for Docker..."
if ! command -v docker &> /dev/null; then
    echo "Error: Docker is not installed or not in PATH. Please install Docker."
    exit 1
fi

COMPOSE_CMD="docker-compose"
if docker compose version &> /dev/null; then
    COMPOSE_CMD="docker compose"
elif ! command -v docker-compose &> /dev/null; then
    echo "Error: Docker Compose is not installed. Please install Docker Compose."
    exit 1
fi

ENV_FILE=".env"

if [ ! -f "$ENV_FILE" ]; then
    echo "No .env file found. Let's create one."
    read -p "Enter Spotify Client ID: " spotify_client_id
    read -p "Enter Spotify Client Secret: " spotify_client_secret
    read -p "Enter Spotify Redirect URI (e.g. http://localhost:3000/callback): " spotify_redirect_uri
    read -p "Enter Spotify Refresh Token: " spotify_refresh_token
    read -p "Enter Slack User Token (xoxp-...): " slack_user_token
    read -p "Enter Slack Signing Secret: " slack_signing_secret
    read -p "Enter Slack App Token (xapp-...) [Optional, press enter to skip]: " slack_app_token
    
    read -p "Enter MySQL Root Password [Default: root]: " db_root_password
    db_root_password=${db_root_password:-root}
    
    read -p "Enter MySQL Database Name [Default: spotify_bot]: " db_name
    db_name=${db_name:-spotify_bot}
    
    read -p "Enter MySQL User [Default: bot_user]: " db_user
    db_user=${db_user:-bot_user}
    
    read -p "Enter MySQL Password [Default: bot_pass]: " db_password
    db_password=${db_password:-bot_pass}

    cat <<EOF > "$ENV_FILE"
SPOTIFY_CLIENT_ID=$spotify_client_id
SPOTIFY_CLIENT_SECRET=$spotify_client_secret
SPOTIFY_REDIRECT_URI=$spotify_redirect_uri
SPOTIFY_REFRESH_TOKEN=$spotify_refresh_token
SLACK_USER_TOKEN=$slack_user_token
SLACK_SIGNING_SECRET=$slack_signing_secret
SLACK_APP_TOKEN=$slack_app_token

DB_ROOT_PASSWORD=$db_root_password
DB_NAME=$db_name
DB_USER=$db_user
DB_PASSWORD=$db_password
PORT=3000
EOF
    echo ".env file created successfully."
else
    echo ".env file found."
fi

echo "Building Docker images if necessary and starting the stack..."
$COMPOSE_CMD -f docker/docker-compose.yml up --build -d

if [ $? -eq 0 ]; then
    echo "Stack started successfully! Run '$COMPOSE_CMD -f docker/docker-compose.yml logs -f' to see logs."
else
    echo "Failed to start the stack."
fi
