FROM node 

WORKDIR /usr/src/

COPY . .

EXPOSE 4000

RUN npm i && npm run build && npx prisma migrate dev

CMD ["npm", "start"]