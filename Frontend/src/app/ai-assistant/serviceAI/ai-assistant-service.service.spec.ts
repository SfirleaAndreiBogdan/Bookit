import { TestBed } from '@angular/core/testing';
import { AiAssistantServiceService } from './ai-assistant-service.service';


describe('AiAssistantServiceService', () => {
  let service: AiAssistantServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiAssistantServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
