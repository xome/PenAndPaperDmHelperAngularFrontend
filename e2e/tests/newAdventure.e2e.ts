
import {setupBrowserHooks, getBrowserState} from './utils';

describe('Landing on the home page', function () {
  setupBrowserHooks();

  it('is running', async function () {
    const {page} = getBrowserState();
    const rootElement = await page.locator('app-root').wait();

    expect(rootElement).not.toBeNull();
  });

  it('offers to create a new Adventure', async function() {
    const {page} = getBrowserState();

    const buttonToCreateNewAdventureSelector = 'button#newAdventure';
    await page.waitForSelector(buttonToCreateNewAdventureSelector);

    const buttonToCreateNewAdventure =
      await page.locator(buttonToCreateNewAdventureSelector).wait() as HTMLElement;
    expect(buttonToCreateNewAdventure).toBeTruthy();
    expect(buttonToCreateNewAdventure.innerHTML).toBeTruthy();

    await page.click(buttonToCreateNewAdventureSelector);

    const editAdventureComponentSelector = 'edit-adventure';
    await page.waitForSelector(editAdventureComponentSelector);

    const editAdventurePage =
      await page.locator(editAdventureComponentSelector).wait() as HTMLElement;
    expect(editAdventurePage.innerHTML).toBeTruthy();

  });


});
