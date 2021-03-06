import {Component, OnInit} from '@angular/core';
import {OptionService} from "../../../services/option.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Option} from "../../../models/option.model";
import {Router} from "@angular/router";
import {urlPopN} from "../../utils/functions";

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {

  public optionForm: FormGroup;
  public user: String;

  constructor(private formBuilder: FormBuilder, private optionService: OptionService, private router: Router) {
    this.optionService.options$.subscribe(() => this.setPreviousValues());
    this.setPreviousValues();
  }

  ngOnInit(): void {
    this.optionService.retrieveOptions();
    this.setPreviousValues();
  }

  setFirstDefaultValues() {
    this.optionForm = this.formBuilder.group({
      fontSize: ['200'],
      dmlaOffset: ['0'],
      theme: [false]
    })
  }

  setPreviousValues() {
    if (this.optionForm === undefined) this.setFirstDefaultValues();
    if (this.optionService.options$.getValue().length > 0) {
      this.optionService.update();
      const option: Option = this.optionService.options$.getValue()[0];
      this.optionForm.get('fontSize').setValue(option.fontSize);
      this.optionForm.get('dmlaOffset').setValue(option.dmlaOffset);
      this.optionForm.get('theme').setValue(option.theme);
    }
  }

  applyOptions() {
    const option: Option = this.optionForm.getRawValue() as Option;
    this.optionService.applyOption(option);
  }

  validateOptions() {
    this.router.navigate([urlPopN(this.router.url, 2)]);
  }
}
