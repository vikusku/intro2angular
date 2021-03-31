import { Directive, OnInit, ElementRef, Renderer2, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @Input() appBetterHighlight: string = 'transparent';
  @Input() onHoverColor: string = '#1976d2';

  @HostBinding('style.backgroundColor') backgroundColor: string = this.appBetterHighlight;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.backgroundColor = this.appBetterHighlight;
  }

  @HostListener('mouseenter') mouseenter() {
    this.backgroundColor = this.onHoverColor;
  }

  @HostListener('mouseleave') mouseleave() {
    this.backgroundColor = this.appBetterHighlight;
  }
}
