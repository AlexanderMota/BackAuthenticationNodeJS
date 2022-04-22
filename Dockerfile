FROM node
COPY . /var/www
WORKDIR /var/www
RUN npm install
EXPOSE 8080
ENTRYPOINT ["npm","start"]