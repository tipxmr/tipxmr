#!/usr/bin/env bash

sudo systemctl start docker
npm install
docker-compose up
npx prisma generate
npm run migrate -- dev
npm run seed
npm run dev
