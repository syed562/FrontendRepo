import { Injectable } from "@angular/core";
import { searchReq } from "../../models/searchRequest";

@Injectable({providedIn: 'root'})
export class searchingStateService{
   // constructor(private readonly req:searchReq){};
    private searchingState:searchReq={
        origin:'',
        destination:'',
        departureDateTime:''
    };
    save(state:searchReq){
        this.searchingState=state;
    }
    get():searchReq{
        return this.searchingState;
    }
    clear(){
        this.searchingState={
        origin:'',
        destination:'',
        departureDateTime:''
    };
    }
}