import { Component, computed, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  clickCount =  signal(0);
  clickCount$ = toObservable(this.clickCount)
 private destroyRef = inject(DestroyRef)
//  interval = signal(0);
//  doubleInterval = computed(() => this.interval() * 2)
 constructor() {
  // effect(() => {
  //   console.log(`Clicked buttin ${this.clickCount()} times.`)
  // })
  // toObservable(this.clickCount)
 }

  ngOnInit(): void {
    // setInterval(() => {
    //   this.interval.update(prevInternalNamber => prevInternalNamber +1);
      
    // }, 1000)
    // const subscipton= interval(1000).pipe(
    //   map((val) => val * 2)
    // ).subscribe({
    //   next: (val) => console.log(val)            
    // });

    // this.destroyRef.onDestroy(() => {
    //   subscipton.unsubscribe();
    // })
    const subscipton = this.clickCount$.subscribe({
      next: (val) => {
        console.log(`Clicked buttin ${this.clickCount()} times.`)
      }
    });
     this.destroyRef.onDestroy(() => {
      subscipton.unsubscribe();
    })
  }
  onClick(){
    this.clickCount.update(prevCount => prevCount + 1)
  }

}
