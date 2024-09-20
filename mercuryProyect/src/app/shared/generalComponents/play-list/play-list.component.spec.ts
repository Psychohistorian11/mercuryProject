import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayListComponent } from './play-list.component';

describe('PlayListComponent', () => {
  let component: PlayListComponent;
  let fixture: ComponentFixture<PlayListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
