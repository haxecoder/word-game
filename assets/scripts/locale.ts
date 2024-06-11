class AppLocale {

    private memo: Map<string, string> = new Map<string, string>();

    constructor() {
        this.init();
    }

    private init() {
        // TODO: get user language
        this.initRu();
    }

    private initRu() {

    }

    public translate(key: string): string {
        return this.memo.get(key);
    }
}

export const locale: AppLocale = new AppLocale();