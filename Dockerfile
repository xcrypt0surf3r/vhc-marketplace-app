FROM node:14.4-alpine3.11

RUN apk add dumb-init

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --chown=node build/ .

EXPOSE 3000

CMD ["dumb-init", "npx", "servor", ".", "index.html", "3000"]