# Stage 1: Build the application
FROM node:18 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy Prisma schema and generate Prisma client
COPY prisma ./prisma/
RUN npx prisma generate

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Create the production image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the compiled application code from the builder stage
COPY --from=builder /app/dist ./dist

# Copy the generated Prisma client from the builder stage
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Expose the port the app runs on
EXPOSE 3000

# Run the application
CMD ["node", "dist/main"]
