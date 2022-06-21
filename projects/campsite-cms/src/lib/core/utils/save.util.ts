export class SaveUtil {
    static holdingControl = false;
    static listeners: { [key: string]: () => Promise<void> } = {};
    static listenerCount = 0;

    constructor() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Control') SaveUtil.holdingControl = true;
            if (e.key === 's' && SaveUtil.listenerCount > 0 && SaveUtil.holdingControl) {
                e.preventDefault();
                if (document.activeElement) (document.activeElement as HTMLElement).blur()
                SaveUtil.save();
            };
        });

        document.addEventListener('keyup', (e) => {
            if (e.key === 'Control') SaveUtil.holdingControl = false;
        });
    }

    public static onSave(callback: () => Promise<void>) {
        const id = `id-${SaveUtil.listenerCount++}`
        SaveUtil.listeners[id] = callback;
        return id;
    }

    public static removeListener(id: string) {
        delete SaveUtil.listeners[id];
        SaveUtil.listenerCount--;

    }

    public static async save() {
        const listeners = Object.values(SaveUtil.listeners);
        await listeners[listeners.length - 1]();
    }
}

new SaveUtil();