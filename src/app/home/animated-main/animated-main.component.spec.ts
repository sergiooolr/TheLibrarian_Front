import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedMainComponent } from './animated-main.component';

describe('AnimatedMainComponent', () => {
  let component: AnimatedMainComponent;
  let fixture: ComponentFixture<AnimatedMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimatedMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
