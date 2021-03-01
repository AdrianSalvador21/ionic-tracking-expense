import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewReportSlidesPage } from './new-report-slides.page';

describe('NewReportSlidesPage', () => {
  let component: NewReportSlidesPage;
  let fixture: ComponentFixture<NewReportSlidesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewReportSlidesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewReportSlidesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
