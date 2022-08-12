import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { CreditCardService } from './credit-card.service';
import { ICreditCardFlag } from './credit-card.interface';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'ngx-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent implements OnInit, OnChanges, OnDestroy {
  @Input() name: string | undefined;
  @Input() expirationDate: string | undefined;
  @Input() securityCode: string | undefined;
  @Input() cardNumber: string | undefined;

	creditCardFlag!: SafeHtml;
  basecolor!: string;
	flipped!: boolean;
	onFocus: EventEmitter<boolean> = new EventEmitter<boolean>();
  private _unsubscribeAll: Subject<any> = new Subject();

  /**
   * CONSTRUCTOR
   * @param service: CreditCardService
   * @param sanitizer: DomSanitizer
   */
  constructor(
    private service: CreditCardService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cardNumber'] && changes['cardNumber'].currentValue) {
      const card: ICreditCardFlag = this.service.defineCardProvider(changes['cardNumber'].currentValue);
      this.creditCardFlag = this.sanitizer.bypassSecurityTrustHtml(card.flag);
      this.basecolor = card.color;
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  /**
   *
   * @param flip: boolean
   */
  flip(flip: boolean): void {
    this.flipped = flip;
  }

  /**
   *
   * @param flip: boolean
   */
  onFocusRequested(flip: boolean): void {
    this.onFocus.emit(flip);
  }
}
