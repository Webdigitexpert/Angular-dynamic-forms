import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories/categories.service';


@Component({
  selector: 'app-multiselectdropdown',
  templateUrl: './multiselectdropdown.component.html',
  styleUrls: ['./multiselectdropdown.component.scss']
})
export class MultiselectdropdownComponent implements OnInit {

  @Input() inputdata:any;
  @Output() multiSelectedData = new EventEmitter()
  
  public dropDownForm:FormGroup; 

  public datafromComponent:any;

  public categories:any;

  constructor(private formBuilder: FormBuilder,private categoryService: CategoriesService) { }

  ngOnInit(): void {

    this.categoryService.getallCategories().subscribe((categories) => {
      this.categories = categories.data;
     
      console.log(categories.data);
    });
  
    this.dropDownForm = this.formBuilder.group({
      multiDropdown : new FormControl('',[Validators.required])
    })
   
  }

  getmultipleDropdown(){
    this.multiSelectedData.emit(this.dropDownForm.value.multiDropdown);
  }

}
