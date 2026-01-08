FROM node:20-alpine

WORKDIR /app

# install deps
COPY package*.json ./
RUN npm ci

# copy app + build
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "dev"]
#CMD ["npm", "start"]