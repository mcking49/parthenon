import { TestBed } from '@angular/core/testing';

import { ProjectsDeprecatedService } from './projects-deprecated.service';

describe('ProjectsDeprecatedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectsDeprecatedService = TestBed.get(ProjectsDeprecatedService);
    expect(service).toBeTruthy();
  });
});
