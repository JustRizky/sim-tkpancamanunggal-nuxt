FROM oven/bun:1 as build
WORKDIR /app

COPY package.json bun.lock* ./

RUN bun install --frozen-lockfile --ignore-scripts

COPY . .

RUN bunx prisma generate

RUN bun run build

FROM oven/bun:1 as production
WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY --from=build /app/.output /app
COPY --from=build /app/.output /app/.output
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/prisma ./prisma

EXPOSE 3000/tcp
CMD ["sh", "-c", "bun run db:deploy && bun /app/.output/server/index.mjs"]
