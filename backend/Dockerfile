# Use an official Node.js runtime as a parent image
FROM node:16

# Install Yarn
RUN npm install -g yarn

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install any needed packages
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Compile TypeScript code to JavaScript
RUN yarn build

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Define environment variable
ENV NODE_ENV=production

# Run the application
CMD ["node", "dist/server.js"]
