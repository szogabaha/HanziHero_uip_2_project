import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagesetterComponent } from './languagesetter.component';

describe('LanguagesetterComponent', () => {
  let component: LanguagesetterComponent;
  let fixture: ComponentFixture<LanguagesetterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LanguagesetterComponent]
    });
    fixture = TestBed.createComponent(LanguagesetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
