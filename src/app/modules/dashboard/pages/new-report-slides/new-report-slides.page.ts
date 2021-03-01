import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {IonSlides, LoadingController, ModalController, NavController} from "@ionic/angular";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../app.reducer";
import {AppObservableService} from "../../../../core/providers/app-observable.service";
import {SetApproversAction, SetBasicReportAction, SetReportAction} from "../../../../core/actions/reports.actions";

@Component({
  selector: 'app-new-report-slides',
  templateUrl: './new-report-slides.page.html',
  styleUrls: ['./new-report-slides.page.scss'],
})
export class NewReportSlidesPage implements OnInit, AfterViewInit {
  public loading;
  public approvers = [];
  public reportBasicData = {
    title: '',
    approver: ''
  };

  @ViewChild('slidess') mainSlider: IonSlides;
  slides: { img: string, titulo: string, desc: string }[] = [
    {
      img: '/assets/images/public/branding/icon.svg',
      titulo: 'Titulo del reporte',
      desc: 'Mira y comparte increíbles fotos de todo el mundo'
    },
    {
      img: '/assets/slides/music-player-2.svg',
      titulo: 'Escucha Música',
      desc: 'Toda tu música favorita está aquí'
    },
    {
      img: '/assets/slides/calendar.svg',
      titulo: 'Nunca olvides nada',
      desc: 'El mejor calendario del mundo a tu disposición'
    },
    {
      img: '/assets/slides/placeholder-1.svg',
      titulo: 'Tu ubicación',
      desc: 'Siempre sabremos donde estás!'
    }
  ];

  constructor(public modal: ModalController, public nav: NavController, public loadingController: LoadingController, private store: Store<AppState>, public observableService: AppObservableService) { }

  ngOnInit() {
    console.log('init');
    this.getApprovers();
  }

  async getApprovers() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Un momento...'
    });
    await this.loading.present();
    const url = '/Approvers';
    this.observableService.getService(true, url).subscribe((data) => {
      console.log(data);

      this.approvers = data.data;
      const action = new SetApproversAction(this.approvers);
      this.store.dispatch(action);
      this.loading.dismiss();
    });
  }

  ngAfterViewInit(): void {
    // this.mainSlider.lockSwipes(true);
  }

  nextStep(last: boolean = false) {
    if (!!last) {
      this.closeModal();
      const action = new SetBasicReportAction(this.reportBasicData);
      this.store.dispatch(action);
      this.nav.navigateForward('/dashboard-tabs-menu/new-report');
      /* this.modal.dismiss().then(() => {
      });
       */
    } else {
      this.mainSlider.slideNext();
      /* this.mainSlider.lockSwipes(false).then(() => {
        this.mainSlider.slideNext();
      });
       */
    }
  }

  closeModal() {
    this.modal.dismiss();
  }

}
