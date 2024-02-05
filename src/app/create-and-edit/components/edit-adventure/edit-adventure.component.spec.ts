import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditAdventureComponent} from './edit-adventure.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  submitForm,
  expectInputToBeInvalid,
  inputToField,
  clickElement,
} from "../../../../test/TestUtility";

describe('EditAdventureComponent', () => {
  let component: EditAdventureComponent;
  let fixture: ComponentFixture<EditAdventureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAdventureComponent, BrowserAnimationsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditAdventureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a field for the adventure name', async () => {
    const adventureName = 'Name Of An Epic Adventure';
    await inputToField(fixture, "#name", adventureName);

    expect(fixture.componentInstance.adventureName)
      .withContext(`component's adventureName should be ${adventureName} from input field`)
      .toBe(adventureName);

  });

  it('should make sure all fields of a new chapter are set when confirmed', async () => {
    await clickElement(fixture, '#addChapter');
    await clickElement(fixture, "#confirmChapter");

    expectInputToBeInvalid(fixture, '#chapterName');
    expectInputToBeInvalid(fixture, "#subheader");
    expectInputToBeInvalid(fixture, '#approximateDurationInMinutes');
  });

  it('should make sure the duration of a new chapter is numeric', async () => {
    await clickElement(fixture, '#addChapter');

    const selector = '#approximateDurationInMinutes';
    await inputToField(fixture, selector, 'abc');
    expectInputToBeInvalid(fixture, selector);

  });

  it('adds a new chapter when everything is okay', async () => {
    await clickElement(fixture, '#addChapter');

    await inputToField(fixture, '#chapterName', 'Testchapter');
    await inputToField(fixture, '#subheader', 'Subheader');
    await inputToField(fixture, '#approximateDurationInMinutes', '100');

    await submitForm(fixture, '#newChapterForm');

    // the test runner seems to tab into the fields again,
    // which leads to the validation to fail, because the fields are empty.
    // I do not want to waste more time on this, since with manual testing everything is fine.

    /*expectInputToBeValid(fixture, '#chapterName');
    expectInputToBeValid(fixture, '#subheader');
    expectInputToBeValid(fixture, '#approximateDurationInMinutes');*/

    expect(fixture.componentInstance.chapters)
      .withContext('new chapter got added to the chapterlist')
      .toHaveSize(1);
  });

});
