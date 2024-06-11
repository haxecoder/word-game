import { describe, test, expect } from 'vitest';
import { LettersCollector } from "db://assets/scripts/utils/LettersCollector";

Array.prototype.remove = function<T>(this: T[], element: T): T[] {
    const index = this.indexOf(element);
    if (index !== -1) {
        this.splice(index, 1);
    }
    return this;
}

describe("collect()", () => {
    const unit = new LettersCollector();

    test('collect([брат]) => [б, р, а, т]', () => {
        const words = ["брат"];

        const result = unit.collect(words);
        expect(result).toEqual(["б", "р", "а", "т"]);
    });

    test('collect([брат, араб, тара]) => [б, р, а, т, а]', () => {
        const words = ["брат", "араб", "тара"];

        const result = unit.collect(words);
        expect(result).toEqual(["б", "р", "а", "т", "а"]);
    });

    test('collect([брат, араб, тара, бар, раб, бра]) => [б, р, а, т, а]', () => {
        const words = ["брат", "араб", "тара", "бар", "раб", "бра"];

        const result = unit.collect(words);
        expect(result).toEqual(["б", "р", "а", "т", "а"]);
    });

    test('collect([араб, тара, бар, раб, бра, брат]) => [а, р, а, б, т]', () => {
        const words = ["араб", "тара", "бар", "раб", "бра", "брат"];

        const result = unit.collect(words);
        expect(result).toEqual(["а", "р", "а", "б", "т"]);
    });
});