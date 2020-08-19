import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HeroComponent (shallow tests)', () => {
  let fixture: ComponentFixture<HeroComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(HeroComponent);
  });
  it('should have the correct hero', () => {
    fixture.componentInstance.hero = { id: 1, name: 'Elon Musk', strength: 10 };
    expect(fixture.componentInstance.hero.name).toEqual('Elon Musk');
  });

  it('should render the hero name in the anchor tag', () => {
    fixture.componentInstance.hero = { id: 1, name: 'Elon Musk', strength: 10 };
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('a').textContent).toContain(
      'Elon Musk'
    );

    // Identical to above expect statement, but using debugElement instead of nativeElement
    let de = fixture.debugElement.query(By.css('a'));
    expect(de.nativeElement.textContent).toContain('Elon Musk');
  });
});
