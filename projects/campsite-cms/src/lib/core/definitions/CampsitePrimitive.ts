export type CampsitePrimitiveType<T extends CampsitePrimitive<any, any>> = T['value'];

export abstract class CampsitePrimitive<T, Settings extends { [key: string]: CampsitePrimitive<any, any> }> {
    abstract validate(value: T): string | null;

    public settings: { [P in keyof Settings]: CampsitePrimitive<any, any> } = {} as any;

    public value!: T;

    constructor(initial: T, settings?: { [P in keyof Settings]: Settings[P] }) {
        if (initial) this.set(initial);
        if (settings) this.settings = settings;
    }

    async transform(value: T): Promise<T> {
        return value;
    }

    async set(value: T): Promise<string | null> {
        try {
            const error = this.validate(value);
            if (!!error) return error;
            this.value = JSON.parse(JSON.stringify(await this.transform(value)));
            return null;
        } catch (e) {
            return null;
        }
    }
}