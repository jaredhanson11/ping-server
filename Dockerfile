FROM --platform=linux/amd64 node:16-slim
WORKDIR /app/
COPY ./ /app/
RUN yarn

ENTRYPOINT ["node", "index.js"]