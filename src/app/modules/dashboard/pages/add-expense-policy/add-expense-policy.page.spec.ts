import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddExpensePolicyPage } from './add-expense-policy.page';

describe('AddExpensePolicyPage', () => {
  let component: AddExpensePolicyPage;
  let fixture: ComponentFixture<AddExpensePolicyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExpensePolicyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddExpensePolicyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
