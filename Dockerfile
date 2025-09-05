############################################
# Dev stage: base image for VS Code devcontainer
############################################
FROM node:18-bullseye AS dev
WORKDIR /workspaces/app

# Developer-friendly defaults
ENV NODE_ENV=development

# Create a non-root user is already provided by node image (user: node)
# We keep the workspace empty; VS Code will bind-mount the project here.

############################################
# Builder: install deps & build Astro static site
############################################
FROM node:18-bullseye AS builder
WORKDIR /app

# Set production env for install optimizations when building for production
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Copy package manifests first to leverage Docker layer cache
COPY package.json package-lock.json* ./

# Install dependencies (prefer npm ci when lockfile present)
RUN if [ -f package-lock.json ]; then npm ci --silent; else npm install --silent; fi

# Copy rest of the source and build
COPY . .
RUN npm run build

# Runtime: nginx serves the built static files
FROM nginx:stable-alpine AS runner
ENV NODE_ENV=production

# Remove default nginx static files and copy our build
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose standard HTTP port
EXPOSE 80

# Optional simple healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
	CMD wget -qO- http://localhost/ >/dev/null || exit 1

CMD ["nginx", "-g", "daemon off;"]
