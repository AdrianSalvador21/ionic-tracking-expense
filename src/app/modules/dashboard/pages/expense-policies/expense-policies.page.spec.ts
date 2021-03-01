import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExpensePoliciesPage } from './expense-policies.page';

describe('ExpensePoliciesPage', () => {
  let component: ExpensePoliciesPage;
  let fixture: ComponentFixture<ExpensePoliciesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensePoliciesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExpensePoliciesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
