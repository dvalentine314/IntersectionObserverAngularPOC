import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ng19';
  @ViewChildren('elementBox') elementBoxes: QueryList<ElementRef> | undefined;
  elementStrings:string[] = []
  ngOnInit() {
    for (let i = 0; i < 50; i++) {
      this.elementStrings.push(`Entry ${i}`);
    }
  }

  ngAfterViewInit() {
    const options = {
      rootMargin: "-200px 0px -200px 0px",
      threshold: 1,
    };

    const callback:IntersectionObserverCallback = (entries, observer) => {

      if(entries[entries.length-10].isIntersecting){
        for (let i = 0; i < 50; i++) {
          this.elementStrings.push(`Entry ${this.elementStrings.length+1}`);
        }
      }
      entries.forEach(entry => {
        entry.target.classList.toggle('is-visible', entry.isIntersecting);
        observer.unobserve(entry.target);
      });
      this.elementBoxes!.forEach(element => observer.observe(element.nativeElement));
    };
    const observer = new IntersectionObserver(callback, options);
    this.elementBoxes!.forEach(element => observer.observe(element.nativeElement));
  }
}
