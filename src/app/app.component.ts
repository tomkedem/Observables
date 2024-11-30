import { Component, computed, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map, Observable, Subscriber, timeInterval } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  clickCount =  signal(0);
  clickCount$ = toObservable(this.clickCount)
  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, { initialValue: 0, manualCleanup: true})
//  interval = signal(0);
//  doubleInterval = computed(() => this.interval() * 2)
 custonInterval$ = new Observable((subscriber) => {
  let timeExecuted = 0;
  const interval = setInterval(() => {
    // subscriber.error()
    if(timeExecuted > 3){
      clearInterval(interval);
      subscriber.complete();
      return;
    }
    console.log('Emitting new value...');
    subscriber.next({ message: 'New value' });
    timeExecuted++;
  }, 2000);
 });
 

 private destroyRef = inject(DestroyRef)


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
    this.custonInterval$.subscribe({
      next: (val) => console.log(val),
      complete: () => console.log('COMPLATED!'),
      error: (err) => console.log(err)
    });

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
