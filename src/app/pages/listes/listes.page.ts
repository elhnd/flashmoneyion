import { Component, OnInit,ViewChild } from '@angular/core';
import { TransactionsService } from 'src/app/services/transactions.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { FormGroup, FormControl,FormBuilder,Validators, NgForm } from '@angular/forms';
import { OrderPipe } from 'ngx-order-pipe';
import { ModalController,NavController } from '@ionic/angular';
import { DetailtransPage } from '../detailtrans/detailtrans.page';

@Component({
  selector: 'app-listes',
  templateUrl: './listes.page.html',
  styleUrls: ['./listes.page.scss'],
})
export class ListesPage implements OnInit {
value = 12;
  constructor(private fb: FormBuilder,private transService: TransactionsService,private orderPipe: OrderPipe,private nav: NavController,public modalController: ModalController) { }
  list = [];
  listEnv = [];
  listRet = [];
  ngOnInit() {
    this.transact(this.transperiodeForm.value)
    this.transuser()
  }
  transperiodeForm = this.fb.group({
    
    debut:['',[Validators.required]],
     
    fin:['',[Validators.required]]

  })

  async myDetails(value) {
      const modal = await this.modalController.create({
        component: DetailtransPage,
        componentProps:{
            id: value
        }
      });
       modal.present();
    }


  transact(datas)
  {
    this.transService.transperiode(datas)
    .subscribe(
      data => {

      this.list = data
      console.log(data)},
      err =>{
        console.log(err)
      }
    )
  }
  test;
  transuser()
  {
    this.transService.transuser()
      .subscribe(
        data => {this.list = data;
          //console.log(this.list)
        },
        err=>console.log(err),
      )
  }

}