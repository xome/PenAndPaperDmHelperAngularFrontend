import {setupBrowserHooks, getBrowserState} from './utils';
import Chapter = dmHelper.Chapter;
import EnvironmentLightning = dmHelper.EnvironmentLightning;
describe('Landing on the home page', function () {
  setupBrowserHooks();

  it('is running', async function () {
    const {page} = getBrowserState();
    const rootElement = await page.locator('app-root').wait();

    expect(rootElement).not.toBeNull();
  });

  it('offers to create a new Adventure', async function () {
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

    const adventureNameInputSelector = '#name';
    await page.waitForSelector(adventureNameInputSelector);

    const adventureNameInput =
      await page.locator(adventureNameInputSelector).wait() as HTMLElement;
    expect(adventureNameInput).toBeTruthy();

    const adventureName = 'Testadventure';
    await page.type(adventureNameInputSelector, adventureName);

    const addChapterButtonSelector = '#addChapter';
    await page.waitForSelector(addChapterButtonSelector);
    const addChapterButton = await page.locator(addChapterButtonSelector).wait() as HTMLElement;
    expect(addChapterButton).toBeTruthy();

    await page.click(addChapterButtonSelector);

    const chapterNameSelector = '#chapterName';
    const approximateDurationSelector = '#approximateDurationInMinutes';
    const subheaderSelector = '#subheader';
    const confirmAddChapterButtonSelector = '#confirmChapter';
    await page.waitForSelector(chapterNameSelector);
    await page.waitForSelector(approximateDurationSelector);
    await page.waitForSelector(subheaderSelector);
    await page.waitForSelector(confirmAddChapterButtonSelector);


    const firstChapter = new Chapter("Testchapter 1",
      "Subheader 1",
      5,
      [new Text("Hello World"),
        new EnvironmentLightning([255, 255, 255], 0.2)]);

    await page.type(chapterNameSelector, firstChapter.name);
    await page.type(approximateDurationSelector, firstChapter.approximateDurationInMinutes.toString());
    await page.type(subheaderSelector, firstChapter.subheader);
    await page.click(confirmAddChapterButtonSelector);

    const chaptersSelector = 'edit-chapters';
    await page.waitForSelector(chaptersSelector);
    const chapters = await page.locator(chaptersSelector).wait() as HTMLElement;

    expect(chapters.children.length).toBe(1); // todo: lets have a look how angular replaces the template

    const chapterSelector = 'edit-chapter';
    await page.waitForSelector(chapterSelector);

    const chapter = await page.locator(chapterSelector).wait() as HTMLElement;
    expect(chapter.innerHTML).toContain(firstChapter.name);
    expect(chapter.innerHTML).toContain(firstChapter.approximateDurationInMinutes.toString());
    expect(chapter.innerHTML).toContain(firstChapter.subheader);

    const addTextSelector = `chapter[name="${firstChapter.name}"] .addText`
    await page.waitForSelector(addTextSelector);


  });


});
