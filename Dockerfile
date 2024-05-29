# Step 1: Use a Node.js base image
FROM node:18

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Step 4: Install the dependencies
RUN npm install

# Step 5: Copy the rest of the application code to the working directory
COPY . .

# Step 6: Expose the port the app runs on
EXPOSE 8080
EXPOSE 3000

# Step 7: Start the application
CMD ["npm", "run", "build"]
CMD ["npm", "run", "serve"]