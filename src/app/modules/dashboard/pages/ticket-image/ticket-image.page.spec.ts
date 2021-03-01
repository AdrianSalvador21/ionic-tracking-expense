import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TicketImagePage } from './ticket-image.page';

describe('TicketImagePage', () => {
  let component: TicketImagePage;
  let fixture: ComponentFixture<TicketImagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketImagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TicketImagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
