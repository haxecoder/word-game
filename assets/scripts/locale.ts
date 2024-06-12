type LocaleKey =
    "ui.currentLevel" |
    "window.win.txtHeader" |
    "window.win.txtBody" |
    "window.win.btnNextLevel" |
    "window.error.session.header" |
    "window.error.session.body" |
    "window.error.session.btnAction";

class AppLocale {

    private memo: Map<LocaleKey, string> = new Map<LocaleKey, string>();

    constructor() {
        this.init();
    }

    private init() {
        // TODO: get user language
        this.initRu();
    }

    private initRu() {
        this.memo.set("window.win.txtHeader", "Уровень %v пройден");
        this.memo.set("window.win.txtBody", "Изумительно!");
        this.memo.set("window.win.btnNextLevel", "Уровень %v");
        this.memo.set("ui.currentLevel", "Уровень %v");
        this.memo.set("window.error.session.btnAction", "Обновить");
        this.memo.set("window.error.session.header", "Две вкладки\nс игрой?");
        this.memo.set("window.error.session.body", "Похоже, игра открыта в\nнескольких вкладках браузера.\nЧтобы продолжить играть в\nэтой вкладке, обновите\nстраницу.");
    }

    public translate(key: LocaleKey, value?: string): string {
        return this.memo.get(key).replace("%v", value);
    }
}

export const locale: AppLocale = new AppLocale();