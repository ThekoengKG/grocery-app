import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  errMsg: any;
  successMsg: any;

  constructor(private _prodService: ProductService, private _router: Router) { }

  ngOnInit() {
  }

  productForm = new FormGroup({
    'name':new FormControl('',Validators.required),
    'price':new FormControl('',Validators.required),
    'quantity':new FormControl('',Validators.required),
    'image':new FormControl('',Validators.required),
    'cat_id':new FormControl('',Validators.required),
  })
  
  productSubmit(){
    if(this.productForm.valid){
      console.log(this.productForm.value);
      this._prodService.createData(this.productForm.value).subscribe((res) => {
        this.successMsg = res.message;
        this.productForm.reset()
      })
    } else {
      this.errMsg = 'all fields are required'
      console.log("All fields are required")
    }

  }


 

}
