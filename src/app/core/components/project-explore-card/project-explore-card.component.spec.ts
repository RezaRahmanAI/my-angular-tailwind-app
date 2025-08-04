import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectExploreCardComponent } from './project-explore-card.component';

describe('ProjectExploreCardComponent', () => {
  let component: ProjectExploreCardComponent;
  let fixture: ComponentFixture<ProjectExploreCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectExploreCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectExploreCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
