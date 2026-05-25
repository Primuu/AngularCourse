import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  clickCount = signal(0);

  clickCount$ = toObservable(this.clickCount);

  interval$ = interval(1000);

  intervalSignal = toSignal(this.interval$, {
    initialValue: 0,
  });

  constructor() {
    // effect(() => {
    //   console.log(`Clicked button ${this.clickCount()} times.`)
    // })
    // toObservable(this.clickCount);
  }

  ngOnInit(): void {
    // interval(1000).subscribe({
    //   next: (val) => console.log(val),
    //   complete: () => console.log('completed'),
    //   error: () => console.log('error'),
    // });

    // const subscription = interval(1000).subscribe((val) => console.log(val));

    // const subscription = interval(1000)
    //   .pipe(map((val) => val * 2))
    //   .subscribe({
    //     next: (val) => console.log(val),
    //   });

    // this.destroyRef.onDestroy(() => {
    //   subscription.unsubscribe();
    // });

    const subscription = this.clickCount$.subscribe({
      next: (val) => console.log(`Clicked button ${val} times.`),
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onClick() {
    this.clickCount.update((prevCount) => prevCount + 1);
  }
}
