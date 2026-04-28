import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    // interval(1000).subscribe({
    //   next: (val) => console.log(val),
    //   complete: () => console.log('completed'),
    //   error: () => console.log('error'),
    // });

    const subscription = interval(1000).subscribe((val) => console.log(val));
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
