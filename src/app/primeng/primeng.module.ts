import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { StepperModule } from 'primeng/stepper';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    InputTextModule,
    ButtonModule,
    FloatLabelModule,
    CalendarModule,
    DropdownModule,
    SliderModule,
    StepperModule,
    KeyFilterModule,
    TooltipModule,
    InputTextareaModule
  ]
})
export class PrimengModule { }
