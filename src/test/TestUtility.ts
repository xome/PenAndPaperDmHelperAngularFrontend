import {By} from "@angular/platform-browser";
import {ComponentFixture} from "@angular/core/testing";

export function nativeElement(fixture: ComponentFixture<any>, cssSelector: string) {
  const nativeElement = fixture.debugElement.query(By.css(cssSelector))?.nativeElement;
  expect(nativeElement)
    .withContext(`element ${cssSelector} should be available`)
    .toBeTruthy();
  return nativeElement;
}

export async function submitForm(fixture: ComponentFixture<any>, cssSelector: string) {
  fixture.debugElement.query(By.css(cssSelector)).triggerEventHandler('submit');
  fixture.detectChanges();
  await fixture.whenStable();
}

export async function inputToField(fixture: ComponentFixture<any>, fieldCssSelector: string, value: string) {
  const adventureNameInput = fixture.debugElement.query(By.css(fieldCssSelector));
  expect(adventureNameInput)
    .withContext(`input field ${fieldCssSelector} should be available`)
    .toBeTruthy();
  const nativeInput = adventureNameInput.nativeElement;
  nativeInput.value = value;
  nativeInput.dispatchEvent(new Event('input'));
  fixture.detectChanges();
  await fixture.whenStable();
}

export async function clickElement(fixture: ComponentFixture<any>, cssSelector: string) {
  const nativeElement = fixture.debugElement.query(By.css(cssSelector))?.nativeElement;
  expect(nativeElement)
    .withContext(`element ${cssSelector} should be available`)
    .toBeTruthy();
  nativeElement.dispatchEvent(new Event('click'));
  await fixture.whenStable();
  fixture.detectChanges();
}

function getClassNameAndValidationMsg(fixture: ComponentFixture<any>, cssSelector: string) {
  const inputField = fixture.debugElement.query(By.css(cssSelector))?.nativeElement as HTMLInputElement;
  const className = inputField.className;
  const validationMessage = inputField.validationMessage;
  return {className, validationMessage};
}

export function expectInputToBeInvalid(fixture: ComponentFixture<any>, cssSelector: string) {
  const {className, validationMessage} = getClassNameAndValidationMsg(fixture, cssSelector);
  if (validationMessage) { // if the last field is required and not filled, then it is valid, but has a validation message
    expect(validationMessage)
      .withContext(`input field ${cssSelector} should be invalid`)
      .toBeTruthy()
  } else { // otherwise the field is marked as invalid
    expect(className)
      .withContext(`input field ${cssSelector} should be invalid`)
      .toContain('ng-invalid');
  }
}

export function expectInputToBeValid(fixture: ComponentFixture<any>, selector: string) {
  const {className, validationMessage} = getClassNameAndValidationMsg(fixture, selector);

  expect(className)
    .withContext(`input field ${selector} should be valid`)
    .not.toContain('ng-invalid');
  expect(validationMessage)
    .withContext(`input field ${selector} should be valid`)
    .toBeFalsy();
}
