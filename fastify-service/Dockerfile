# 1. Builder stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install system dependencies (for bcrypt build + optional Postgres tools)
RUN apk add --no-cache python3 g++ make

# Copy only package files and install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Optional: Rebuild bcrypt for Alpine
RUN npm rebuild bcrypt --build-from-source || true

# Compile TypeScript
RUN yarn build

# 2. Final runtime stage
FROM node:20-alpine AS runner

WORKDIR /app

# Install runtime dependency: PostgreSQL client (if using pg_dump or similar)
RUN apk add --no-cache postgresql-client

# Copy necessary files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/node_modules ./node_modules

# Create and permission upload/asset folders
RUN mkdir -p /app/uploads /app/assets/files/backup \
    && chmod -R 777 /app/uploads /app/assets

# Create a non-root user and assign permissions
RUN addgroup -S appgroup && adduser -S appuser -G appgroup \
    && chown -R appuser:appgroup /app/uploads /app/assets

USER appuser

EXPOSE 3000

CMD ["yarn", "start:prod"]
