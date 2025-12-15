import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { searchReq } from '../../models/searchReq';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [FormsModule],
  standalone:true,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
 constructor(private readonly router:Router){}
 req: searchReq = {
  origin: '',
  destination: ''
};
onSubmit() {
  this.router.navigate(['/flights'], {
    state:{
      searchData:{
        origin:this.req.origin,
        destination:this.req.destination
        
      }
    }
  });
}

}
