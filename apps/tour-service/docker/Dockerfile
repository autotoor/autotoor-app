FROM node:18.16.0-alpine AS base

ARG PNPM_VERSION=8.5.1
ARG TURBO_VERSION=1.10.3

# Install package manager
RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store \
    npm i --global --no-update-notifier --no-fund pnpm@${PNPM_VERSION}

FROM base AS builder

# Set working directory
WORKDIR /app

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk update && apk add --no-cache libc6-compat && npm i --global turbo@${TURBO_VERSION}
COPY . .
RUN turbo prune --scope="tour-service" --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer

# Set working directory
WORKDIR /app

RUN apk update && apk add --no-cache libc6-compat
#RUN apk update && apk add g++ make py3-pip

# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN pnpm fetch

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

# Uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM

# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN

RUN pnpm install -r --offline --ignore-scripts
RUN pnpm turbo run build --filter="tour-service"

FROM base AS runner
WORKDIR /app

# Use the node user from the image (instead of the root user)
USER node
COPY --from=installer /app .

CMD [ "node", "apps/tour-service/dist/main.js" ]