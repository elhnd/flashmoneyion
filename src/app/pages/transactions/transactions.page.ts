import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TransactionsService } from 'src/app/services/transactions.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {
panelOpenState = false;
public erreur;
  constructor(private formBuilder: FormBuilder,private transService: TransactionsService,public alertController: AlertController) { }
 
  ngOnInit() {
  }

  transGroup = this.formBuilder.group({
      'nom_complet_e': [null, [Validators.required,Validators.minLength(2),Validators.pattern(/[a-z-A-Z]/)]],
      'tel_e': [null, [Validators.required,Validators.pattern(/[0-9]/),Validators.minLength(2)]],
      'adresse_e': [null, [Validators.required,Validators.minLength(2)]],
      'cin_e': [null,[Validators.required,Validators.maxLength(13),Validators.minLength(13),Validators.pattern(/[0-9]/)]],
      
      'nom_complet_b': [null,[Validators.required,Validators.minLength(2),Validators.pattern(/[a-z-A-Z]/)]],
      'tel_b': [null, Validators.required],
      'adresse_b': [null,[Validators.minLength(2)]],
      'montant_transfert': [null,[Validators.required,Validators.pattern(/[0-9]/),Validators.min(500),Validators.max(3000000)]]
    })

    retraitForm = this.formBuilder.group({

      'code_genere': [null,[Validators.required,Validators.pattern(/[0-9]/)]],
      'cin_b':[null,[Validators.required,Validators.maxLength(13),Validators.minLength(13),Validators.pattern(/[0-9]/)]]
    })

    getErrorNomE() {
    return this.transGroup.get('nom_complet_e').hasError('required') ? 'Le nom est requis ' :
      this.transGroup.get('nom_complet_e').hasError('pattern') ? 'Le nom est invalide' :
      this.transGroup.get('nom_complet_e').hasError('minLength') ? '' : 'Le nom doit contenir au moins deux caractères';
    }

    getErrorNomB() {
    return this.transGroup.get('nom_complet_b').hasError('required') ? 'Le nom est requis ' :
      this.transGroup.get('nom_complet_b').hasError('pattern') ? 'Le nom est invalide' :
      this.transGroup.get('nom_complet_b').hasError('minLength') ? 'Le nom doit contenir au moins deux caractères' : '';
    }

    getErrorTelE(){
      return this.transGroup.get('tel_e').hasError('required') ? 'Le numero est requis ' :
      this.transGroup.get('tel_e').hasError('pattern') ? 'Le numero est invalide' :
      this.transGroup.get('tel_e').hasError('minLength') ? '' : 'Le numero doit contenir au moins deux caractères';
    }

    getErrorTelB(){
      return this.transGroup.get('tel_b').hasError('required') ? 'Le numero est requis ' :
      this.transGroup.get('tel_b').hasError('pattern') ? 'Le numero est invalide' :
      this.transGroup.get('tel_b').hasError('minLength') ? 'Le numero doit contenir au moins deux caractères' : '';
    }

    getErrorAdresseE(){
      return this.transGroup.get('adresse_e').hasError('required') ? 'L\'adresse de l\'expéditeur est requis ' :
      this.transGroup.get('adresse_e').hasError('minLength') ? '' : 'L\'adresse doit contenir au moins deux caractères';
    }

     getErrorAdresseB(){
      return this.transGroup.get('adresse_b').hasError('minLength') ? '' : 'L\'adresse doit contenir au moins deux caractères';
    }

    getErrorCinE(){
      return this.transGroup.get('cin_e').hasError('required') ? 'Le numero d\'iditification est requis ' :
      this.transGroup.get('cin_e').hasError('pattern') ? 'Le numero d\'iditification est invalide' :
      this.transGroup.get('cin_e').hasError('maxLength') ? 'Le numero d\'iditification doit être composé de 13 chiffres' :
      this.transGroup.get('cin_e').hasError('minLength') ? '' : 'Le numero d\'iditification doit être composé de 13 chiffres';
    }

    getErrorMontant(){
      return this.transGroup.get('montant_transfert').hasError('required') ? 'Le montant du transfert est requis ' :
      this.transGroup.get('montant_transfert').hasError('pattern') ? 'Le montant est invalide' :
      this.transGroup.get('montant_transfert').hasError('maxLength') ? 'Le montant doit être inférieur à 3000000' : 
      this.transGroup.get('montant_transfert').hasError('min') ? 'Le montant doit être suppérieur à 500' : '';
    }

    nomB:String;
    nomE:String;
    cinE:String;
    numero:String;
    telB:String;
    telE:String;
    cinB:String;
    montant:number;
    frais:number;
    total:number;
    message:string;
    subHeader:string;
    header:string;
    error;
    date;
    dateR;
    affiche: boolean = false;
      info(response){
        this.date = response.createdAt
        this.numero = response.codeGenere
        this.nomB = response.nomCompletB
        this.telB = response.telB
        this.nomE = response.nomCompletE
        this.telE = response.telE
        this.cinE = response.cinE
        this.montant = response.montantTransfert 
        this.frais = response.fraisTransaction
        this.total = response.totalEnvoi
        this.cinB = response.cinB
        this.dateR = response.dateRetrait
      }
     async alertOk() {
          const alert = await this.alertController.create({
              header: 'Envoi d\'argent',
              subHeader: 'Infos :',
              message: 'Transfert réussi.'
              +'<p>Date : '+this.date+'</p>'
              +'<p>Code transaction : '+this.numero+'</p>'
              +'<p>Montant transfert : '+this.montant+'</p>'
              +'<p>Frais transfert : '+this.frais+'</p>'
              +'<p>Total envoi : '+this.total+'</p>'
              +'<p>---------Bénéficiaire--------- </p>'
              +'<p>Nom : '+this.nomB +'</p>'
              +'<p>Telephone : '+this.telB +'</p>'
              +'<p>---------Expéditeur--------- </p>'
              +'<p>Nom : '+this.nomE +'</p>'
              +'<p>Telephone : '+this.telE +'</p>'
              +'<p>Numero d\'identité : '+this.cinE +'</p>',
              buttons: ['OK']
          })
        await alert.present();
        }

        async alertKo() {
          const alert = await this.alertController.create({
              header: this.header,
              subHeader: this.subHeader,
              message: '<p>'+this.error+'</p>',
              buttons: ['OK']
          })
        await alert.present();
        }

        async find() {
          const alert = await this.alertController.create({
            header: 'Code de transaction',
            message: 'INFOS'
              +'<p>Date : '+this.date+'</p>'
              +'<p>Code transaction : '+this.numero+'</p>'
              +'<p>Montant transfert : '+this.montant+'</p>'
              +'<p>Frais transfert : '+this.frais+'</p>'
              +'<p>Total envoi : '+this.total+'</p>'
              +'<p>---------Bénéficiaire--------- </p>'
              +'<p>Nom : '+this.nomB +'</p>'
              +'<p>Telephone : '+this.telB +'</p>'
              +'<p>---------Expéditeur--------- </p>'
              +'<p>Nom : '+this.nomE +'</p>'
              +'<p>Telephone : '+this.telE +'</p>'
              +'<p>Numero d\'identité : '+this.cinE +'</p>',
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
                  console.log('Confirm Cancel: blah');
                }
              }, {
                text: 'Okay',
                handler: () => {
                  this.affiche = true;
                  console.log('Confirm Okay');
                }
              }
            ]
          });
      
          await alert.present();
        }

        async retraitOk() {
          const alert = await this.alertController.create({
            header: 'Retrait Effectué',
            message: 'INFOS'
            +'<p>Date : '+this.dateR+'</p>'
            +'<p>Code transaction : '+this.numero+'</p>'
            +'<p>Montant transfert : '+this.montant+'</p>'
            +'<p>---------Bénéficiaire--------- </p>'
            +'<p>Nom : '+this.nomB +'</p>'
            +'<p>Telephone : '+this.telB +'</p>'
            +'<p>Numero d\'identité : '+this.cinB +'</p>'
            +'<p>---------Expéditeur--------- </p>'
            +'<p>Nom : '+this.nomE +'</p>'
            +'<p>Telephone : '+this.telE +'</p>',
            buttons: [
               {
                text: 'Okay',
                handler: () => {
                  this.affiche = false;
                  //console.log('Confirm Okay');
                }
              }
            ]
          });
      
          await alert.present();
        }

      envoi(){
    //console.log(this.transactionForm.value);
    this.transService.envoie(this.transGroup.value)
      .subscribe(
        response =>{
          this.info(response)
          this.alertOk()
            //console.log(response)
        } ,
        error =>{
          //console.error('Error!', error)
          this.error = error.error.error.exception[0].message
          this.header = 'Envoi d\'argent';
          this.subHeader='Transaction echouée';
          this.alertKo()
        } 
      )
  }  

  findCodeOk(){
    this.transService.findcode(this.retraitForm.value)
    .subscribe(
      response => {
        //console.log(response)
        this.info(response)
          this.find()  
      },
      error =>{
       // console.log(err)
       this.error = error.error.error.exception[0].message
       this.header = 'Vérification code d\'envoi';
       this.subHeader='Etat';
       this.alertKo()
          console.log(this.erreur)
      },
    );
  }

  retrait(){
    this.transService.retrait(this.retraitForm.value)
    .subscribe(
      response => { 
        console.log(response)
        this.info(response)
        this.retraitOk() 
        //console.log(data)  
      },
      error =>{
        this.error = error.error.error.exception[0].message
        this.header = 'Retrait d\'argent';
        this.subHeader='Echec retrait d\'argent';
        this.alertKo()
           console.log(this.erreur)
        }
    )
    this.affiche = false;
  }
}
