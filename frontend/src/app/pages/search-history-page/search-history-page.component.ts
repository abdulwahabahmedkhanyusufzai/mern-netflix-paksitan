import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { LucideAngularModule, Trash } from 'lucide-angular';
import { SMALL_IMG_BASE_URL } from '../../constants';

@Component({
    selector: 'app-search-history-page',
    standalone: true,
    imports: [CommonModule, NavbarComponent, LucideAngularModule],
    templateUrl: './search-history-page.component.html'
})
export class SearchHistoryPageComponent implements OnInit {
    searchHistory = signal<any[]>([]);
    http = inject(HttpClient);
    toastr = inject(ToastrService);

    SMALL_IMG_BASE_URL = SMALL_IMG_BASE_URL;

    ngOnInit() {
        this.getSearchHistory();
    }

    getSearchHistory() {
        this.http.get<{ content: any[] }>('/api/v1/search/history')
            .subscribe({
                next: (res) => this.searchHistory.set(res.content),
                error: () => this.searchHistory.set([])
            });
    }

    handleDelete(entry: any) {
        this.http.delete(`/api/v1/search/history/${entry.id}`)
            .subscribe({
                next: () => {
                    this.searchHistory.update(history => history.filter(item => item.id !== entry.id));
                    this.toastr.success('Search item deleted');
                },
                error: () => this.toastr.error('Failed to delete search item')
            });
    }
}
