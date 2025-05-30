FROM node:22-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY pnpm-lock.yaml package.json ./

RUN pnpm install --frozen-lockfile

COPY . .

ENV NODE_ENV=development
ENV HOST=0.0.0.0
EXPOSE 3000

CMD ["pnpm", "dev"]