FROM node as builder
WORKDIR /app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --strict-ssl=false
COPY . .

RUN npm run build

FROM nginx
COPY --from=builder /app/dist/log-monitor /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]