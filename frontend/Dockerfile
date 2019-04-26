FROM node as builder

WORKDIR /opt/blog

COPY yarn.lock /opt/blog/
COPY package.json /opt/blog/
COPY src/ /opt/blog/src
COPY public/ /opt/blog/public

RUN yarn install
RUN yarn run build

FROM nginx

COPY --from=builder /opt/blog/build /usr/share/nginx/html