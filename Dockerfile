# Use official Node.js image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Create a non-root user 'nextjs'
RUN addgroup -S nextjs && adduser -S nextjs -G nextjs

# Set permissions
RUN chown -R nextjs:nextjs /app

# Switch to the non-root user
USER nextjs

# Build Next.js app
RUN npm run build

# Use a smaller image for production
FROM node:20-alpine AS runner

WORKDIR /app

# Copy the built app from the builder stage
COPY --from=builder /app ./

# Start the server
CMD ["npm", "dev"]