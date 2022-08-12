import { Injectable } from '@angular/core';
import { FlagsFromCreditCard, ICreditCardFlag } from './credit-card.interface';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  /**
   * CONSTRUCTOR
   */
  constructor() { }

  /**
	 * Método responsável por alterar a cor do cartão de acordo com a operadora
	 * @param cardNumber: string
   * @returns ICreditCardFlag
	 */
	defineCardProvider(cardNumber: string): ICreditCardFlag {
    let card: ICreditCardFlag = {flag: '', color: ''};

		if (cardNumber.match(new RegExp("^(5[1-5]\\d{0,2}|22[2-9]\\d{0,1}|2[3-7]\\d{0,2})\\d{0,12}")) != null) {
			card.flag = FlagsFromCreditCard.MASTERCARD;
			card.color = 'lightblue';
		} else if (cardNumber.match(new RegExp("^3[47]\\d{0,13}")) != null) {
      card.flag = FlagsFromCreditCard.AMEX;
			card.color = 'green';
		} else if (cardNumber.match(new RegExp("^4\\d{0,15}")) != null) {
      card.flag = FlagsFromCreditCard.VISA;
			card.color = 'lime';
		} else if (cardNumber.match(new RegExp("^3(?:0([0-5]|9)|[689]\\d?)\\d{0,11}")) != null) {
      card.flag = FlagsFromCreditCard.DINERS;
			card.color = 'orange';
		} else if (cardNumber.match(new RegExp("^(?:6011|65\\d{0,2}|64[4-9]\\d?)\\d{0,12}")) != null) {
      card.flag = FlagsFromCreditCard.DISCOVER;
			card.color = 'purple';
		} else if (cardNumber.match(new RegExp("^(?:5[0678]\\d{0,2}|6304|67\\d{0,2})\\d{0,12}")) != null) {
      card.flag = FlagsFromCreditCard.MAESTRO;
			card.color = 'yellow';
		} else if (cardNumber.match(new RegExp("^62\\d{0,14}")) != null) {
      card.flag = FlagsFromCreditCard.UNIONPAY;
			card.color = 'cyan';
		} else if (cardNumber.match(new RegExp("^(?:2131|1800)\\d{0,11}")) != null || cardNumber.match(new RegExp("^(?:35\\d{0,2})\\d{0,12}")) != null) {
      card.flag = FlagsFromCreditCard.JCB;
			card.color = 'red';
		} else {
      card.flag = '';
			card.color = 'grey';
		}

    return card;
	}
}
