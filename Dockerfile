FROM --platform=$BUILDPLATFORM node:20.10.0-bullseye-slim as builder

RUN mkdir /project
WORKDIR /project

RUN npm install -g @angular/cli@17

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
CMD ["ng", "serve", "--host", "0.0.0.0"]

FROM builder as dev-envs
RUN apt-get update && apt-get install -y --no-install-recommends git

RUN useradd -s /bin/bash -m vscode
RUN groupadd docker
RUN usermod -aG docker vscode
# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /

CMD ["ng", "serve", "--host", "0.0.0.0"]
