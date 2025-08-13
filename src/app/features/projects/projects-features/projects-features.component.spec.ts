import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsFeaturesComponent } from './projects-features.component';

describe('ProjectsFeaturesComponent', () => {
  let component: ProjectsFeaturesComponent;
  let fixture: ComponentFixture<ProjectsFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsFeaturesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
