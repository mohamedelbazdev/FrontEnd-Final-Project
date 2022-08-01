import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderDetalisComponent } from './provider-detalis.component';

describe('ProviderDetalisComponent', () => {
  let component: ProviderDetalisComponent;
  let fixture: ComponentFixture<ProviderDetalisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderDetalisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderDetalisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
