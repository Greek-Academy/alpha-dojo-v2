# Use a smaller base image
FROM node:lts-slim

RUN apt-get update && apt-get install -y \
    bash \
    g++ \
    make \
    openjdk-17-jre-headless && \
    npm install -g firebase-tools

RUN mkdir data
