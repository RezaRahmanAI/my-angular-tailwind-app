import { Directive, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements AfterViewInit {
  constructor(private el: ElementRef, private r: Renderer2) {}

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.r.addClass(this.el.nativeElement, 'animate-entrance');
            observer.unobserve(this.el.nativeElement);
          }
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(this.el.nativeElement);
  }
}
