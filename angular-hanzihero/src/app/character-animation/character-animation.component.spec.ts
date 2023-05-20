import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterAnimationComponent } from './character-animation.component';

describe('CharacterAnimationComponent', () => {
  let component: CharacterAnimationComponent;
  let fixture: ComponentFixture<CharacterAnimationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterAnimationComponent]
    });
    fixture = TestBed.createComponent(CharacterAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
