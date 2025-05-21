FROM node:latest

# Set the working directory in the container.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the source code.
COPY . .

# Expose the port (make sure this matches your config; here we assume 3000)
EXPOSE 3000

# Start the application.
CMD ["npm", "start"]