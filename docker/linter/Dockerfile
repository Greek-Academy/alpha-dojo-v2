FROM nikolaik/python-nodejs:latest
#FROM node:20-alpine

WORKDIR /usr/src/app

RUN npm i -g pnpm
RUN npm install -g typescript

# Python install
COPY requirements.txt .
RUN pip3 install -r requirements.txt

# Node install
COPY package.json .
# COPY pnpm-lock.yaml .
RUN pnpm install

COPY src ./src
COPY tsconfig.json .
RUN tsc

COPY eslint.config.mjs .
COPY .pylintrc .

ENV LINTER_PORT=${LINTER_PORT}
EXPOSE ${LINTER_PORT}

CMD ["npm", "start"]
