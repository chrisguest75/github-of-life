FROM node:14.18.1-bullseye AS BUILDER
LABEL dockerfile.baseimage="node:14.18.1-bullseye" dockerfile.description="github-of-life" dockerfile.stage="BUILDER"

WORKDIR /scratch
COPY package.json package-lock.json ./
# https://docs.npmjs.com/cli/v7/commands/npm-ci
RUN npm ci

COPY static ./static
COPY tsconfig.json .nsprc .prettierrc jest.config.js .parcelrc .eslintrc.json ./
COPY src ./src
COPY tests ./tests
RUN npm run lint
RUN npm run test:coverage
RUN npm run build
# use better-npm-audit
RUN npm run audit

FROM nginx:1.21.3 AS PRODUCTION
LABEL dockerfile.baseimage="nginx:1.21.3" dockerfile.description="github-of-life" dockerfile.stage="PRODUCTION"

## add permissions for nginx user
RUN chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /var/log/nginx && \
        chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid

## switch to non-root user
USER nginx

ENV PORT=80
WORKDIR /work
COPY bootstrap.sh /work/bootstrap.sh

WORKDIR /usr/share/nginx/html
COPY --from=BUILDER /scratch/dist ./

CMD ["/bin/sh", "-c", "/work/bootstrap.sh"]