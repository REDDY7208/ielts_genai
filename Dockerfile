#Base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and yarn.lock/package-lock.json to the container
COPY package.json yarn.lock ./
# If you use npm instead of yarn, replace the above line with:
# COPY package.json package-lock.json ./

# Install dependencies
RUN yarn install
# If you use npm instead of yarn, replace the above line with:
# RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Expose the port Vite uses (5173 by default)
EXPOSE 5173

# Command to start the Vite development server
#CMD ["yarn", "run", "dev", "--host"]
# If you use npm instead of yarn, replace the above line with:
CMD ["npm", "run", "dev", "--", "--host"]
