FROM node:20

WORKDIR /app

COPY package.json yarn.lock .

RUN yarn install --ignore-scripts

COPY . .

EXPOSE 3000
CMD ["yarn", "run", "start:frontend"]
