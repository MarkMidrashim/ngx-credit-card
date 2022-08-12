import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appFlipCardOnClick]'
})
export class FlipCardOnClickDirective implements OnInit, OnChanges, OnDestroy {
  @Input() flipped!: boolean;
  @Input() onFocus!: EventEmitter<boolean>;

  private _unsubscribeAll: Subject<any> = new Subject();

  /**
   * CONSTRUCTOR
   * @param renderer: Renderer2
   * @param elementRef: ElementRef
   */
  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) { }

  @HostListener('click')
  onMouseOver(): void {
    this.handleFlip();
  }

  ngOnInit(): void {
    if (this.onFocus) {
      this.onFocus.pipe(takeUntil(this._unsubscribeAll)).subscribe(flip => {
        this.flipped = !flip;
        this.handleFlip();
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['flipped'] && !changes['flipped'].firstChange) {
      this.handleFlip();
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  /**
   * Método responsável por realizar o flip no cartão
   */
  handleFlip(): void {
    if (!this.flipped) {
      this.renderer.addClass(this.elementRef.nativeElement, 'flipped');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'flipped');
    }
    this.flipped = !this.flipped;
  }
}
