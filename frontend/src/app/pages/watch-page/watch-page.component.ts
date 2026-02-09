import { Component, ElementRef, OnInit, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ContentService } from '../../services/content.service';
import { LucideAngularModule, ChevronLeft, ChevronRight } from 'lucide-angular';
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from '../../constants';
// No need for dateFunction, use DatePipe

@Component({
    selector: 'app-watch-page',
    standalone: true,
    imports: [CommonModule, RouterLink, NavbarComponent, LucideAngularModule], // DatePipe is in CommonModule
    templateUrl: './watch-page.component.html'
})
export class WatchPageComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private http = inject(HttpClient);
    public contentService = inject(ContentService);
    private sanitizer = inject(DomSanitizer);

    @ViewChild('sliderRef') sliderRef!: ElementRef<HTMLDivElement>;

    id = signal<string | null>(null);
    trailers = signal<any[]>([]);
    currentTrailerIdx = signal(0);
    loading = signal(true);
    content = signal<any>(null);
    similarContent = signal<any[]>([]);

    ORIGINAL_IMG_BASE_URL = ORIGINAL_IMG_BASE_URL;
    SMALL_IMG_BASE_URL = SMALL_IMG_BASE_URL;

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            this.id.set(id);
            if (id) {
                this.loadData(id);
            }
        });

        // Handle contentType changes? 
        // Usually navigating to watch page implies a content type or it's part of the route. 
        // In the React app, it uses store's contentType.
        // If user navigates from movie to tv show, ID changes, but contentType might need to update? 
        // The previous implementation relied on the store's state which was set by Navbar/Home.
        // We assume store is correct.
    }

    loadData(id: string) {
        const type = this.contentService.contentType();
        this.loading.set(true);

        // Trailers
        this.http.get<{ trailers: any[] }>(`/api/v1/${type}/${id}/trailers`)
            .subscribe({
                next: (res) => this.trailers.set(res.trailers),
                error: () => this.trailers.set([])
            });

        // Similar
        this.http.get<{ similar: any[] }>(`/api/v1/${type}/${id}/similar`)
            .subscribe({
                next: (res) => this.similarContent.set(res.similar),
                error: () => this.similarContent.set([])
            });

        // Details
        this.http.get<{ content: any }>(`/api/v1/${type}/${id}/details`)
            .subscribe({
                next: (res) => {
                    this.content.set(res.content);
                    this.loading.set(false);
                },
                error: () => {
                    this.content.set(null);
                    this.loading.set(false);
                }
            });
    }

    getSafeUrl(key: string): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${key}?autoplay=0`); // ReactPlayer logic might differ slightly, using embed
    }

    handleNext() {
        if (this.currentTrailerIdx() < this.trailers().length - 1) {
            this.currentTrailerIdx.update(v => v + 1);
        }
    }

    handlePrev() {
        if (this.currentTrailerIdx() > 0) {
            this.currentTrailerIdx.update(v => v - 1);
        }
    }

    scrollLeft() {
        if (this.sliderRef?.nativeElement) {
            this.sliderRef.nativeElement.scrollBy({ left: -this.sliderRef.nativeElement.offsetWidth, behavior: "smooth" });
        }
    }

    scrollRight() {
        if (this.sliderRef?.nativeElement) {
            this.sliderRef.nativeElement.scrollBy({ left: this.sliderRef.nativeElement.offsetWidth, behavior: "smooth" });
        }
    }
}
