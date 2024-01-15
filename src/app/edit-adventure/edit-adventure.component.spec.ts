import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdventureComponent } from './edit-adventure.component';

describe('EditAdventureComponent', () => {
  let component: EditAdventureComponent;
  let fixture: ComponentFixture<EditAdventureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAdventureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditAdventureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
