import * as puppeteer from 'puppeteer';
import {DockerComposeEnvironment} from "testcontainers";
import {
  StartedDockerComposeEnvironment
} from "testcontainers/build/docker-compose-environment/started-docker-compose-environment";

const baseUrl = process.env['baseUrl'] ?? 'http://localhost:4200/';
let browser: puppeteer.Browser;
let page: puppeteer.Page;

let container: StartedDockerComposeEnvironment | undefined;

if (process.env['DOCKER_COMPOSE_PATH'] == undefined) {
  throw new Error("Path of docker-compose file for backend testcontainer is undefined!");
}
const composePath: string = process.env['DOCKER_COMPOSE_PATH'];

if (process.env['DOCKER_COMPOSE_FILE'] == undefined) {
  throw new Error("docker-compose file for backend testcontainer is undefined!");
}
const composeFile: string = process.env['DOCKER_COMPOSE_FILE'];


if (process.env['DOCKER_ENV_FILE'] == undefined) {
  throw new Error(".env file for backend testcontainer is undefined!");
}
const dockerEnvFile: string = process.env['DOCKER_ENV_FILE'];

jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;

export function setupBrowserHooks(path = ''): void {

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: 'new'
    });
    container = await
      new DockerComposeEnvironment(composePath, composeFile)
        .withEnvironmentFile(dockerEnvFile)
        .up();
  });


  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto(`${baseUrl}${path}`);
  });

  afterEach(async () => {
    await page.close();
  });


  afterAll(async () => {
    await browser.close();
    if (container != undefined)
      await container.down();
  });

}

export function getBrowserState(): {
  browser: puppeteer.Browser;
  page: puppeteer.Page;
  baseUrl: string;
} {
  if (!browser) {
    throw new Error(
      'No browser state found! Ensure `setupBrowserHooks()` is called.'
    );
  }
  return {
    browser,
    page,
    baseUrl,
  };
}
