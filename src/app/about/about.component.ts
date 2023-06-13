import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <div class="content-container">
      <div class="content-title-group">
        <h2 class="title">About</h2>
      </div>
      <div class="content-title-group not-found">
        <p>
          This Tour of Heroes project was created to help represent a fundamental app written with
          Angular. The heroes and villains theme is used throughout the app.
        </p>
        <br />
        <p>by <a href="http://twitter.com/john_papa">John Papa</a></p>
        <br />
        <h2 class="title">What</h2>
        <p>
          Tons of goodness, but pay close attention to the guards, preload strategies, and http
          interceptors.
        </p>
      </div>
    </div>
  `,
  standalone: true,
})
export class AboutComponent {}
