# Use Node.js 20 on Alpine Linux as our base image
# Alpine is a minimal Linux distro (~5MB), keeps the image small
FROM node:20-alpine

# Set the working directory inside the container
# All following commands will run from this folder
WORKDIR /app

# Copy only package.json and package-lock.json first
# We do this before copying source code because Docker caches layers
# If package.json hasn't changed, Docker skips npm install on next build (faster)
COPY package*.json ./

# Install dependencies inside the container
RUN npm install

# Now copy the rest of the source code
COPY . .

# Tell Docker this container will listen on port 5173 (Vite's default port)
# This is just documentation — it doesn't actually open the port
EXPOSE 5173

# Command to run when the container starts
# --host makes Vite listen on 0.0.0.0 instead of localhost
# Without --host, the app is unreachable from outside the container
CMD ["npm", "run", "dev", "--", "--host"]