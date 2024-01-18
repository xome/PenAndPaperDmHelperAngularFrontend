import * as puppeteer from 'puppeteer';
import {DockerComposeEnvironment} from "testcontainers";
import {
  StartedDockerComposeEnvironment
} from "testcontainers/build/docker-compose-environment/started-docker-compose-environment";
import {ElementHandle} from "puppeteer";
import path from "path";

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


export function setupBackend() {
  beforeAll(async () => {
    container = await
      new DockerComposeEnvironment(composePath, composeFile)
        .withEnvironmentFile(dockerEnvFile)
        .up();
  })

  afterAll(async () => {
    if (container != undefined)
      await container.down();
  })
}

export function setupBrowserHooks(path = ''): void {

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: 'new'
    });
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


export function hexToRgb(hex: string): [number, number, number] {
  if (hex.at(0) != '#') {
    hex = '#' + hex;
  }
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  return [r, g, b];
}

export function rgbToHex(rgb: [number, number, number]): string {
  return '#' + rgb[0].toString(16) + rgb[1].toString(16) + rgb[2].toString(16);
}

export async function uploadFile(inputSelector: string, filePath: string) {

  const elementHandle =
    await page.$(inputSelector) as ElementHandle<HTMLInputElement>;
  expect(elementHandle).toBeTruthy();

  if (elementHandle) {
    await elementHandle.uploadFile(path.relative(process.cwd(), __dirname + filePath));
    await elementHandle.evaluate(upload => upload.dispatchEvent(new Event('change', {bubbles: true})));
  }
}
