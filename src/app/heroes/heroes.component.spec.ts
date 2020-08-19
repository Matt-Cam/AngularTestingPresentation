import { HeroesComponent } from './heroes.component';
import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroService } from '../hero.service';
import { NO_ERRORS_SCHEMA, Component, Input } from '@angular/core';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';

describe('HeroesComponent (isolated tests)', () => {
  let component: HeroesComponent;
  let HEROES;
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: 'Doctor Strange', strength: 10 },
      { id: 2, name: 'Iron Man', strength: 8 },
      { id: 3, name: 'Spiderman', strength: 5 },
    ];

    mockHeroService = jasmine.createSpyObj([
      'getHeroes',
      'addHero',
      'deleteHero',
    ]);

    component = new HeroesComponent(mockHeroService);
  });

  describe('delete', () => {
    it('should remove the indicated hero from the heroes list', () => {
      // provide implementaiton of the deleteHero method
      mockHeroService.deleteHero.and.returnValue(of(true));

      component.heroes = HEROES;
      component.delete(HEROES[2]);
      expect(component.heroes.length).toBe(2);
    });

    it('should call deleteHero', () => {
      // provide implementaiton of the deleteHero method
      mockHeroService.deleteHero.and.returnValue(of(true));

      component.heroes = HEROES;
      component.delete(HEROES[2]);

      expect(mockHeroService.deleteHero).toHaveBeenCalled();
    });
  });
});

describe('Heroes Component, no errors schema (shallow integration tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: 'Doctor Strange', strength: 10 },
      { id: 2, name: 'Iron Man', strength: 8 },
      { id: 3, name: 'Spiderman', strength: 5 },
    ];

    mockHeroService = jasmine.createSpyObj([
      'getHeroes',
      'addHero',
      'deleteHero',
    ]);
    TestBed.configureTestingModule({
      declarations: [HeroesComponent],

      providers: [{ provide: HeroService, useValue: mockHeroService }],

      schemas: [NO_ERRORS_SCHEMA], // tempoarary workaround to handle child component
    });
    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should set heroes correctly from the service', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges(); // waits for ngOnInit to trigger

    expect(fixture.componentInstance.heroes.length).toBe(HEROES.length);
  });

  it('should render an li for each hero', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges(); // waits for ngOnInit to trigger

    expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(
      HEROES.length
    );
  });
});

describe('Heroes Component, mocking child (shallow integration tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

  @Component({
    selector: 'app-hero',
    template: '<div></div>',
  })
  class MockHeroComponent {
    @Input() hero: Hero;
  }

  beforeEach(() => {
    HEROES = [
      { id: 1, name: 'Doctor Strange', strength: 10 },
      { id: 2, name: 'Iron Man', strength: 8 },
      { id: 3, name: 'Spiderman', strength: 5 },
    ];

    mockHeroService = jasmine.createSpyObj([
      'getHeroes',
      'addHero',
      'deleteHero',
    ]);
    TestBed.configureTestingModule({
      declarations: [HeroesComponent, MockHeroComponent],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
    });
    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should set heroes correctly from the service', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges(); // waits for ngOnInit to trigger

    expect(fixture.componentInstance.heroes.length).toBe(HEROES.length);
  });

  it('should render an li for each hero', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges(); // waits for ngOnInit to trigger

    expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(
      HEROES.length
    );
  });
});
