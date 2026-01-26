# ===============================
# Build stage
# ===============================
FROM oven/bun:1 as build
WORKDIR /app

COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile --ignore-scripts

COPY . .

RUN bunx prisma generate

RUN bun run build --production

# ===============================
# Production stage
# ===============================
FROM oven/bun:1-alpine as production
WORKDIR /app

RUN apk add --no-cache openssl

RUN bun add -g tsx

COPY --from=build /app/.output /app/.output
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/prisma ./prisma

COPY --from=build /app/server ./server

EXPOSE 3000

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
CMD ["/entrypoint.sh"]

