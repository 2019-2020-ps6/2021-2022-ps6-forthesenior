import { Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OptionService} from "../../../services/option.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Option} from "../../../models/option.model";

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit{
  userId: string;
  public optionForm : FormGroup;

  constructor(private router: Router,public formBuilder: FormBuilder, public route: ActivatedRoute, public optionService: OptionService) {
    this.userId = this.route.snapshot.paramMap.get('idUser');
    this.optionForm = this.formBuilder.group({
      fontSize: [],
      dmlaOffset: [''],
      parkinsonOffset:[''],
      theme:[]
    })
    this.optionService.setAdminOption();
  }


  ngOnInit(): void {
  }

  public onSubmit(){
    //alert(JSON.stringify(this.optionForm.value))
    const options = this.optionForm.getRawValue() as Option;
    this.optionService.addOption(options,this.userId)
    let account= this.route.snapshot.paramMap.get('idAccount');
    this.router.navigate(['/'+account+'/user-list']);
  }

}



