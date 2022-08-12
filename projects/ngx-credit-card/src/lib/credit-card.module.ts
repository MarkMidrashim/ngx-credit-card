import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CreditCardComponent } from './credit-card.component';
import { CreditCardNumberFormatterPipe } from './credit-card-number-formatter.pipe';
import { FlipCardOnClickDirective } from './flip-card-on-click.directive';


@NgModule({
  declarations: [
    CreditCardComponent,
    CreditCardNumberFormatterPipe,
    FlipCardOnClickDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CreditCardComponent
  ]
})
export class CreditCardModule { }
