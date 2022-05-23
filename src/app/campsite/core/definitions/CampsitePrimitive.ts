export type CampsitePrimitiveType<T extends CampsitePrimitive<any, any>> = ReturnType<T['get']>;

export abstract class CampsitePrimitive<T, Settings extends { [key: string]: CampsitePrimitive<any, any> }> {
    abstract validate(value: T): string | null;

    public settings: { [P in keyof Settings]: CampsitePrimitive<any, any> } = {} as any;

    private value!: T;

    constructor(initial: T, settings?: { [P in keyof Settings]: Settings[P] }) {
        if (initial) this.set(initial);
        if (settings) this.settings = settings;
    }

    transform(value: T): T {
        return value;
    }

    set(value: T): string | null {
        try {
            const error = this.validate(value);
            if (!!error) return error;
            this.value = JSON.parse(JSON.stringify(this.transform(value)));
            return null;
        } catch (e) {
            return null;
        }
    }

    get(): T {
        return this.value;
    }
}