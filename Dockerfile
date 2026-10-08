FROM node:22-bookworm-slim AS runtime
ENV NODE_ENV=production PORT=8787 DATA_DIR=/data
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && mkdir /data && chown node:node /data
COPY scripts/build.mjs scripts/build.mjs
COPY public public
COPY worker worker
COPY drizzle drizzle
COPY .openai/hosting.json .openai/hosting.json
COPY cloud/vm.mjs cloud/vm.mjs
RUN node scripts/build.mjs
USER node
EXPOSE 8787
CMD ["node", "cloud/vm.mjs"]

FROM runtime AS test
USER root
RUN npm ci --include=dev
COPY tests tests
RUN node --test tests/backend.test.mjs tests/frontend.test.mjs

FROM runtime AS production
