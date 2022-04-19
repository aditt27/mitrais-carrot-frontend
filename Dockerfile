FROM node:16.14.2-alpine

WORKDIR /home/app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json .
COPY package-lock.json .

RUN npm install
RUN npm install -g serve

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["serve", "-s", "build"]