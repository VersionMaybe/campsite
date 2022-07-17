import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CampsiteSaveService {
    holdingControl = false;
    listeners: { [key: string]: () => Promise<void> } = {};
    listenerCount = 0;

    constructor() {
        if (document && document.addEventListener) {
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Control') this.holdingControl = true;
                if (e.key === 's' && this.listenerCount > 0 && this.holdingControl) {
                    e.preventDefault();
                    if (document.activeElement) (document.activeElement as HTMLElement).blur()
                    this.save();
                };
            });

            document.addEventListener('keyup', (e) => {
                if (e.key === 'Control') this.holdingControl = false;
            });
        }
    }

    public onSave(callback: () => Promise<void>) {
        const id = `id-${this.listenerCount++}`
        this.listeners[id] = callback;
        return id;
    }

    public removeListener(id: string) {
        delete this.listeners[id];
        this.listenerCount--;

    }

    public async save() {
        const listeners = Object.values(this.listeners);
        await listeners[listeners.length - 1]();
    }
}
