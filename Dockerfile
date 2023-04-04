FROM node:lts-alpine

# Create app directory
RUN mkdir -p /usr/local/cross-channel-chat

# Set working directory
WORKDIR /usr/local/cross-channel-chat

# Install app dependencies
COPY . /usr/local/cross-channel-chat/

# Install app dependencies (if package.json exists)
RUN if [ -f package.json ]; then npm install; fi

# Environment
ENV TOKEN=
ENV SOURCE_CHANNEL_ID=
ENV TARGET_CHANNEL_ID=
ENV ERROR_LOG=stderr

# Run
CMD [ "main.js" ]
