FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json /app/
COPY .env /app/

# Copy the rest of the application code to the working directory
COPY . .

# Install app dependencies
RUN npm install

# Generate Prisma client
RUN npx prisma generate

EXPOSE 3000
# Define the command to run your application
CMD ["npm", "run", "start:dev"]