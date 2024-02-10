import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditChapterComponent} from './edit-chapter.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Chapter} from "../../../model/chapter";
import {inputToField, nativeElement, submitForm} from "../../../../test/TestUtility";

describe('EditChapterComponent', () => {
  let component: EditChapterComponent;
  let fixture: ComponentFixture<EditChapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditChapterComponent,
        BrowserAnimationsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditChapterComponent);
    component = fixture.componentInstance;
  });

  describe('with test chapter', () => {

    const chapter = new Chapter("Testchapter", "Subheader", 10, []);

    beforeEach(async () => {
      component.chapter = chapter;
      fixture.detectChanges();
      await fixture.whenStable();
    });

    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    it('should output the chapter name in its header', () => {
      expect(nativeElement(fixture, 'mat-panel-title').innerText)
        .withContext(`title should be model's data`)
        .toBe(chapter.name);
    });

    it('should output the chapter subheader in its header', () => {
      expect(nativeElement(fixture, 'mat-panel-description > span:first-child').innerText)
        .withContext(`subheader detail should be model's data`)
        .toBe(chapter.subheader);
    });

    it('should output the duration in its header', () => {
      expect(nativeElement(fixture, 'mat-panel-description > span:last-child').innerText)
        .withContext(`duration detail should be model's data`)
        .toBe(chapter.approximateDurationInMinutes + ' minutes');
    });

    it('should offer the possibility to change the chapter\'s name', async () => {
      const newName = 'other test chapter'
      await inputToField(fixture, '#name', newName);
      await submitForm(fixture, '#editChapterForm');
      expect(fixture.componentInstance.chapter.name)
        .withContext('chapter\'s name should have been changed')
        .toBe(newName);
    });

    it('should offer the possibility to change the chapter\'s subheader', async () => {
      const newSubheader = 'new subheader';
      await inputToField(fixture, '#subheader', newSubheader);
      await submitForm(fixture, '#editChapterForm');
      expect(fixture.componentInstance.chapter.subheader)
        .withContext('subheader should have been changed')
        .toBe(newSubheader);
    });

    it('should offer the possibility to change the chapter\'s duration', async () => {
      const newDuration = chapter.approximateDurationInMinutes + 10;
      await inputToField(fixture, '#approximateDurationInMinutes', newDuration.toString());
      await submitForm(fixture, '#editChapterForm');
      expect(fixture.componentInstance.chapter.approximateDurationInMinutes)
        .withContext('duration should have been changed')
        .toBe(newDuration);
    });

  });
});
