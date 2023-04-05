# Build
docker build . --tag cross-channel-chat

# Run
docker run --name myCCC --detach --env TOKEN={DISCORD BOT TOKEN} --env SOURCE_CHANNEL_ID={Source channel id} --env TARGET_CHANNEL_ID={Destination channel id} cross-channel-chat
