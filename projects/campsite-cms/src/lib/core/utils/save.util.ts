export class SaveUtil {
    static holdingControl = false;
    static listeners: { [key: string]: () => void } = {};
    static listenerCount = 0;

    constructor() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Control') SaveUtil.holdingControl = true;
            if (e.key === 's' && SaveUtil.listenerCount > 0 && SaveUtil.holdingControl) {
                e.preventDefault();
                if (document.activeElement) (document.activeElement as HTMLElement).blur()
                const listeners = Object.values(SaveUtil.listeners);
                listeners[listeners.length - 1]();
            };
        });

        document.addEventListener('keyup', (e) => {
            if (e.key === 'Control') SaveUtil.holdingControl = false;
        });
    }

    public static onSave(callback: () => void) {
        const id = `id-${SaveUtil.listenerCount++}`
        SaveUtil.listeners[id] = callback;
        return id;
    }

    public static removeListener(id: string) {
        delete SaveUtil.listeners[id];
        SaveUtil.listenerCount--;

    }
}

new SaveUtil();