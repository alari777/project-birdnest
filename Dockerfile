FROM node:16-alpine

WORKDIR /opt/app
COPY package.json package-lock.json* ./

RUN npm ci
ADD . .

ENV NODE_ENV production

RUN npm run build
RUN npm prune --production

CMD ["npm", "start"]
EXPOSE 3000
