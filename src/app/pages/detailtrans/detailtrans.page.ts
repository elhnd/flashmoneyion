import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionsService } from 'src/app/services/transactions.service';
import { ModalController,NavController } from '@ionic/angular';

@Component({
  selector: 'app-detailtrans',
  templateUrl: './detailtrans.page.html',
  styleUrls: ['./detailtrans.page.scss'],
})
export class DetailtransPage implements OnInit {

id = this.actRoute.snapshot.params['id'];
passedId = null;
detailstrans :{
    montantTransfert: any;
};
  constructor(public actRoute: ActivatedRoute, public router: Router,private transService: TransactionsService,public modalController: ModalController) { }

  ngOnInit() {
  if(this.id){
        this.transService.details(this.id)
        .subscribe(data =>{
            this.detailstrans = data
            console.log(this.detailstrans)
            } );
      }
  }

  dismiss() {
      // using the injected ModalController this page
      // can "dismiss" itself and optionally pass back data
      this.modalController.dismiss({
        'dismissed': true
      });
    }

}
