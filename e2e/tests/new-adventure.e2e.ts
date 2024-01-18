import {setupBrowserHooks, getBrowserState, setupBackend, rgbToHex, uploadFile} from './utils';
import {Chapter} from "../../src/model/chapter";
import {EnvironmentLightning} from "../../src/model/environment-lightning";
import {Text} from "../../src/model/text";
import {ElementHandle, Page} from "puppeteer";
import path from "path";

describe('Landing on the home page', function () {
  setupBrowserHooks();
  setupBackend();

  it('is running', async function () {
    const {page} = getBrowserState();
    const rootElement = await page.locator('app-root').wait();

    expect(rootElement).not.toBeNull();
  });

  it('offers to create a new Adventure', async function () {
    const {page} = getBrowserState();

    // Overview of Adventures
    const buttonToCreateNewAdventureSelector = 'button#newAdventure';
    await page.waitForSelector(buttonToCreateNewAdventureSelector);

    const buttonToCreateNewAdventure =
      await page.locator(buttonToCreateNewAdventureSelector).wait() as HTMLElement;
    expect(buttonToCreateNewAdventure).toBeTruthy();
    expect(buttonToCreateNewAdventure.innerHTML).toBeTruthy();

    await page.click(buttonToCreateNewAdventureSelector);

    // Create new Adventure
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

    const firstChapter = new Chapter("Testchapter 1",
      "Subheader 1",
      5,
      []);
    await addChapter(firstChapter, page);

    // Added Chapter should be visible


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


    // Add Records
    const addTextSelector = `chapter[name="${firstChapter.name}"] .addText`;
    await page.waitForSelector(addTextSelector);

    const addBackgroundMusicSelector = `chapter[name="${firstChapter.name}"] .addBackgroundMusic`;
    await page.waitForSelector(addBackgroundMusicSelector);

    const addChapterLinkSelector = `chapter[name="${firstChapter.name}"] .addChapterLink`;
    await page.waitForSelector(addChapterLinkSelector);

    const addEnvLightSelector = `chapter[name="${firstChapter.name}"] .addEnvironmentLightning`;
    await page.waitForSelector(addEnvLightSelector);

    const addPictureSelector = `chapter[name="${firstChapter.name}"] .addPicture`;
    await page.waitForSelector(addPictureSelector);

    // Add Text
    const text = new Text("Hello world!");

    await page.click(addTextSelector);

    const textInputSelector = '#textInput';
    await page.waitForSelector(textInputSelector);

    const confirmRecordSelector = '#confirmNewRecord';
    await page.waitForSelector(confirmRecordSelector);

    await page.type(textInputSelector, text.text);
    await page.click(confirmRecordSelector);

    const textSelector = `chapter[name="${firstChapter.name}"] text`
    await page.waitForSelector(textSelector);

    const textRecord = await page.locator(textSelector).wait() as HTMLElement;
    expect(textRecord.innerText).toBe(text.text);

    // Add EnvironmentLightning

    const envLight = new EnvironmentLightning([255, 255, 255], 0.9);

    await page.click(addEnvLightSelector);

    const colorChooserSelector = '#colorChooser';
    const brightnessChooserSelector = '#brightnessChooser';
    await page.waitForSelector(colorChooserSelector);
    await page.waitForSelector(brightnessChooserSelector);
    await page.waitForSelector(confirmRecordSelector);

    // it's a bit hacky since we don't do a "right" user event, but I don't see any other way here for a color chooser
    await page.$eval(colorChooserSelector,
      el => el.setAttribute('value', rgbToHex(envLight.rgb)));

    const brightnessChooser = await page.$(brightnessChooserSelector);
    const pos = await brightnessChooser?.asElement()?.boundingBox();
    expect(pos).toBeTruthy();

    if (pos) {
      const percentage = envLight.brightness * 100; // adjust slider percentage;
      await page.mouse.click(
        pos.x + percentage * (pos.width / 100),
        pos.y
      );
    }

    await page.click(confirmRecordSelector);

    const colorRecordSelector = `chapter[name="${firstChapter.name}"] environment-lightning`;
    await page.waitForSelector(colorRecordSelector);

    const environmentLightning = await page.locator(colorRecordSelector).wait();
    expect(environmentLightning.innerHTML).toContain(envLight.brightness.toPrecision(2));
    expect(environmentLightning.innerHTML).toContain(rgbToHex(envLight.rgb));

    // Add BackgroundMusic
    await page.click(addBackgroundMusicSelector);

    const backgroundMusicNameSelector = '#name';
    const uploadMusicSelector = '#uploadBackgroundMusic';
    await page.waitForSelector(confirmRecordSelector);
    await page.waitForSelector(backgroundMusicNameSelector);
    await page.waitForSelector(uploadMusicSelector)

    await page.type(backgroundMusicNameSelector, 'Bullet Train');
    await uploadFile(uploadMusicSelector, 'e2e/examples/bullettrain.mp3');

    await page.click(confirmRecordSelector);

    const backgroundMusicSelector = `chapter[name="${firstChapter.name}"] background-music`;
    await page.waitForSelector(backgroundMusicSelector);
    const backgroundMusic = await page.locator(backgroundMusicSelector).wait();
    expect(backgroundMusic).toBeTruthy();
    expect(backgroundMusic.innerHTML).toContain('Bullet Train');
    // data is a bit hard to assert

    // Add Picture
    await page.click(addPictureSelector);

    const isShareableWithGroupSelector = '#isShareableWithGroup';
    const fileUploadPictureSelector = '#uploadPicture';
    await page.waitForSelector(fileUploadPictureSelector);
    await page.waitForSelector(isShareableWithGroupSelector);
    await page.waitForSelector(confirmRecordSelector);

    await page.click(isShareableWithGroupSelector);
    await uploadFile(fileUploadPictureSelector, 'e2e/examples/dickbutt.png');

    await page.click(confirmRecordSelector);

    const pictureSelector = `chapter[name="${firstChapter.name}"] picture`;
    await page.waitForSelector(pictureSelector);

    // Add 2nd chapter

    const secondChapter = new Chapter("Testchapter 2",
      "Subheader 2",
      10,
      []);

    await addChapter(secondChapter, page);

    // Add ChapterLink in first Chapter to second Chapter
    await page.click(addChapterLinkSelector)

    const chapterToSelector = '#chapterTo';
    await page.waitForSelector(chapterToSelector);
    await page.waitForSelector(confirmRecordSelector);

    await page.select(chapterToSelector, firstChapter.name);
    await page.click(confirmRecordSelector);

    const chapterLinkSelector = `chapter[name="${firstChapter.name}"] chapterLink`;
    const chapterLink = await page.locator(chapterLinkSelector).wait() as HTMLElement;
    expect(chapterLink.innerHTML).toContain(secondChapter.name);

    const saveAdventureSelector = '#save';
    await page.click(saveAdventureSelector);

    const adventuresComponent = await page.locator('adventures').wait() as HTMLElement;
    expect(adventuresComponent.innerHTML).toContain(adventureName);

  });

  async function addChapter(chapter: Chapter, page: Page) {
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
    await page.type(chapterNameSelector, chapter.name);
    await page.type(approximateDurationSelector, chapter.approximateDurationInMinutes.toString());
    await page.type(subheaderSelector, chapter.subheader);
    await page.click(confirmAddChapterButtonSelector);
  }

});
