import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectExploreComponent } from './project-explore.component';

describe('ProjectExploreComponent', () => {
  let component: ProjectExploreComponent;
  let fixture: ComponentFixture<ProjectExploreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectExploreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectExploreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
