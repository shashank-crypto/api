# Use a base image with the desired OS and dependencies installed
FROM node:16.18.0-bullseye

# Set the working directory for the application
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files into the container
COPY package*.json .

# Install the dependencies
RUN npm install

# Set the entrypoint to be bash
# CMD ["/bin/bash"]
# ENTRYPOINT [ "/bin/bash" ]
ENTRYPOINT [ "bash" ]