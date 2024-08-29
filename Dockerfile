

# Build stage for starlight-frontend
FROM oven/bun:latest
WORKDIR /timm-bingo
COPY server/package.json ./
# RUN bun i
RUN mkdir build
COPY server/build ./build
COPY server/server.js ./
EXPOSE 4900
# RUN cd server | bun run prod
CMD ["bun", "run", "prod"]