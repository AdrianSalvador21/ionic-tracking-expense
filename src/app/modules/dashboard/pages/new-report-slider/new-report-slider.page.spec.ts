import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewReportSliderPage } from './new-report-slider.page';

describe('NewReportSliderPage', () => {
  let component: NewReportSliderPage;
  let fixture: ComponentFixture<NewReportSliderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewReportSliderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewReportSliderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
