import {Component, OnInit} from '@angular/core';
import {OptionService} from "../../../services/option.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {setAdminOption} from "../../utils/options.functions";
import {Option} from "../../../models/option.model";

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {

  public optionForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private optionService: OptionService) {
    this.optionService.options$.subscribe(() => this.setPreviousValues());
    this.setPreviousValues();
    setAdminOption();
  }

  ngOnInit(): void {
    this.optionService.retrieveOptions();
    this.setPreviousValues();
  }

  setFirstDefaultValues() {
    this.optionForm = this.formBuilder.group({
      fontSize: ['200'],
      dmlaOffset: ['0'],
      parkinsonOffset: ['0'],
      theme: [false]
    })
  }

  setPreviousValues() {
    if (this.optionForm === undefined) this.setFirstDefaultValues();
    if (this.optionService.options$.getValue().length > 0) {
      const option: Option = this.optionService.options$.getValue()[0];
      this.optionForm.get('fontSize').setValue(option.fontSize);
      this.optionForm.get('dmlaOffset').setValue(option.dmlaOffset);
      this.optionForm.get('parkinsonOffset').setValue(option.parkinsonOffset);
      this.optionForm.get('theme').setValue(option.theme);
    }
  }

  applyOptions() {
    const option: Option = this.optionForm.getRawValue() as Option
    this.optionService.applyOption(option)
  }
}