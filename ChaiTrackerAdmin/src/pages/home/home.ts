import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	public displayList: Array<Object>;

  constructor(public navCtrl: NavController,public http:ApiProvider) {

  }

	pay(){

	}

	ionViewWillEnter(){

  	}

  	ionViewDidEnter(){
  		this.displayList=[];
  		this.http.showAll().then((data)=>{
  			console.log(data)
  			if (data.length>0) {
  				for (var i = 0; i < data.length; i++) {
  					this.displayList.push({
  					id: data[i]['id'],
  					name: data[i]['name']


  				})
  				}
  				
  			}
  		})
  	}

  	openTemp(){
  		this.http.getUser('mebi','1234').then((val:boolean)=>{
  			if (val) {
  				console.log('Completed')
  			}
  		})
  	}
}
