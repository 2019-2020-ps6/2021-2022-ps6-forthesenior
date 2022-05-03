import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OptionService} from "../../../services/option.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Option} from "../../../models/option.model";

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {
  userId: string;
  public optionForm: FormGroup;
  public crete: boolean;
  public option: Option;

  constructor(private router: Router, public formBuilder: FormBuilder, public route: ActivatedRoute, public optionService: OptionService) {
    // this.userId = this.route.snapshot.paramMap.get('idUser');
    // this.optionService.getOption(this.userId);
    // this.optionService.option$.subscribe((myOption) => {
    //   this.option = myOption;
    // })
    // this.optionForm = this.formBuilder.group({
    //   fontSize: ['300'],
    //   dmlaOffset: ['20'],
    //   theme: [false]
    // })
    // setAdminOption();
  }


  ngOnInit(): void {
    this.optionService.retrieveOptions();
  }

  public onSubmit() {
    //alert(JSON.stringify(this.optionForm.value))
    // console.log(this.option);
    // const options = this.optionForm.getRawValue() as Option;
    // if (this.option[0] === undefined) {
    //   this.optionService.addOption(options, this.userId);
    // } else {
    //   this.optionService.modifyOption(options, this.userId);
    // }
    // let account = this.route.snapshot.paramMap.get('idAccount');
    // this.router.navigate(['/' + account + '/user-list']);
  }
}
