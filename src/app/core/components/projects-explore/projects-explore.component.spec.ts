import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsExploreComponent } from './projects-explore.component';

describe('ProjectsExploreComponent', () => {
  let component: ProjectsExploreComponent;
  let fixture: ComponentFixture<ProjectsExploreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsExploreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsExploreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
