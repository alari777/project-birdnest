#FROM node:lts as dependencies
#WORKDIR /opt/app
#COPY package.json package-lock.json* ./
#RUN npm ci
#
#FROM node:lts as builder
#WORKDIR /opt/app
#COPY . .
#COPY --from=dependencies /opt/app/node_modules ./node_modules
#RUN npm run build
#
#FROM node:lts as runner
#WORKDIR /opt/app
#ENV NODE_ENV production
#
#COPY --from=builder /opt/app/public ./public
#COPY --from=builder /opt/app/package.json ./package.json
#COPY --from=builder /opt/app/.next ./.next
#COPY --from=builder /opt/app/node_modules ./node_modules
#
#EXPOSE 3000
#CMD ["npm", "start"]

FROM node:lts

WORKDIR /opt/app
COPY package.json package-lock.json* ./

RUN npm ci
ADD . .

ENV NODE_ENV production

RUN npm run build
RUN npm prune --production

CMD ["npm", "start"]
EXPOSE 3000
