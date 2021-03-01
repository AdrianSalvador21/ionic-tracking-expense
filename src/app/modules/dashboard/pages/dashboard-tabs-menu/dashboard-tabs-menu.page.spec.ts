import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardTabsMenuPage } from './dashboard-tabs-menu.page';

describe('DashboardTabsMenuPage', () => {
  let component: DashboardTabsMenuPage;
  let fixture: ComponentFixture<DashboardTabsMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardTabsMenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardTabsMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
