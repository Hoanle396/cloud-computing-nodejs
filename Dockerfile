FROM node:16

WORKDIR .
COPY . .
RUN yarn
EXPOSE 8183
CMD [ "yarn", "start" ]