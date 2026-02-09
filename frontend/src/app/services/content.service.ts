import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ContentService {
    private _contentType = signal<string>('movie');
    public contentType = this._contentType.asReadonly();

    constructor() { }

    setContentType(type: string) {
        this._contentType.set(type);
    }
}
