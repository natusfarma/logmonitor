FROM node:alpine
WORKDIR /app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --strict-ssl=false
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
