export class LettersCollector {

    public collect(wordsOrigin: string[]): string[] {
        const words = wordsOrigin.slice();
        const letters = words.shift().split("");

        words.forEach(word => {
            const lettersOrigin = letters.slice();
            const lettersToAdd: string[] = [];
            word.split("").forEach(letter => {
                if (lettersOrigin.includes(letter)) {
                    lettersOrigin.remove(letter);
                } else {
                    lettersToAdd.push(letter);
                }
            });
            letters.push(...lettersToAdd);
        });

        return letters;
    }

}