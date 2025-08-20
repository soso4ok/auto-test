# Use official Node.js LTS image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the backend source code
COPY . .

# Expose backend port (change if needed)
EXPOSE 3000

# Start the backend server
CMD ["npm", "start"]
