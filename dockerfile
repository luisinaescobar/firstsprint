FROM node:alpine

WORKDIR /app
COPY . .
RUN /bin/sh -c 'npm i'

ENV PORT=5000
ENV DB_USERNAME=luisina
ENV DB_PASSWORD=luisina
ENV DB_NAME=luisina
ENV DB_PORT=3306
ENV JWT_SECRET=secretkey
ENV PAYPAL_CLIENTID=AVvxSgHFjtQzZc8-oY6CY3pCJCTZLiWeEas6Pn43iokH19J7wtkfbldfwxp-He1pQBVwhodekImfybhO
ENV PAYPAL_API=https://api-m.sandbox.paypal.com
ENV PAYPAL_SECRET=EBG6lu_DL2SpWAZFITZhmRkb4cM6KQToSNN6LnNVtCqj_5LoKhyWBGhS0UopTwIGoXMkRuxK0ClIx-hG

CMD [ "npm", "start" ]