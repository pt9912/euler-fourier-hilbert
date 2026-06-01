FROM node:20-alpine

WORKDIR /app

RUN npm install --no-audit --no-fund katex@0.16.9

COPY validate-math.js /app/validate-math.js

WORKDIR /work
ENTRYPOINT ["node", "/app/validate-math.js"]
