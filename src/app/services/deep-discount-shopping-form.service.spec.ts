import { TestBed } from '@angular/core/testing';

import { DeepDiscountShoppingFormService } from './deep-discount-shopping-form.service';

describe('DeepDiscountShoppingFormService', () => {
  let service: DeepDiscountShoppingFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeepDiscountShoppingFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
