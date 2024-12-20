import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowedAdminListComponent } from './borrowed-admin-list.component';

describe('BorrowedAdminListComponent', () => {
  let component: BorrowedAdminListComponent;
  let fixture: ComponentFixture<BorrowedAdminListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrowedAdminListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrowedAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
