import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    standalone: true,
    template: `
    <footer class="py-6 md:px-8 md:py-0 bg-black text-white border-t border-gray-800">
      <div class="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p class="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by
          <a
            href="https://github.com/abdulwahabahmedkhanyusufzai"
            target="_blank"
            class="font-medium underline underline-offset-4"
          >
            you
          </a>
          . The source code is available on
          <a
            href="https://github.com/abdulwahabahmedkhanyusufzai"
            target="_blank"
            rel="noreferrer"
            class="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  `,
    styles: []
})
export class FooterComponent { }
