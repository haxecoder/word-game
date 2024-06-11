class AppLocale {

    private memo: Map<string, string> = new Map<string, string>();

    constructor() {
        this.init();
    }

    private init() {

    }

    public translate(key: string): string {
        return this.memo.get(key);
    }
}

export const locale: AppLocale = new AppLocale();