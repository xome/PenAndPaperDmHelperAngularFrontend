import {ComponentFixture, TestBed} from "@angular/core/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AdventuresComponent} from "./adventures.component";
import {Router, RouterLinkWithHref} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientModule} from "@angular/common/http";
import {By} from "@angular/platform-browser";

describe('AdventureComponent', () => {
  let component: AdventuresComponent;
  let fixture: ComponentFixture<AdventuresComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdventuresComponent, BrowserAnimationsModule, HttpClientModule,
        RouterTestingModule.withRoutes([{
          path: 'newAdventure',
          component: AdventuresComponent // does not matter for this test. Could be a DummyComponent too
        }])],
      providers: []
    }).compileComponents();
    fixture = TestBed.createComponent(AdventuresComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should offer the opportunity to create a new Adventure', async () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const button = compiled.querySelector('#newAdventure');
    expect(button).not.toBeNull();

    const routerLinkInstance = fixture
      .debugElement
      .query(By.css('#newAdventure'))
      .injector.get(RouterLinkWithHref);

    expect(routerLinkInstance['commands']).toEqual(['newAdventure']);
  });


})
