import {ComponentFixture, TestBed} from "@angular/core/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AdventuresComponent} from "./adventures.component";
import {Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";

describe('AdventureComponent', () => {
  let component: AdventuresComponent;
  let fixture: ComponentFixture<AdventuresComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdventuresComponent, BrowserAnimationsModule, RouterTestingModule.withRoutes([])],
      providers: [
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AdventuresComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should offer the opportunity to create a new Adventure', async () => {
    const navigateSpy = spyOn(router, 'navigate');

    const compiled = fixture.nativeElement as HTMLElement;

    const button = compiled.querySelector('#newAdventure') as HTMLElement;
    expect(button).not.toBeNull();
    button.click();

    fixture.detectChanges();
    await fixture.whenStable();
    expect(navigateSpy).toHaveBeenCalledWith(['/newAdventure']);

  });


})
