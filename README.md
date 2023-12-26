Пакет предназначен для перевода целых чисел в прописное представление на русском языке и наоборот, а также для склонения слов с числительными.

## Функции

**wordsToNumber(words: string): number | undefined ** - переводит прописное значение в число:

```bash
  wordsToNumber("семьсот девяносто два триллиона девятьсот миллиардов триста два миллиона триста тысяч девятьсот девяносто один") ->  792900302300991
  
  wordsToNumber("ноль") ->  0
  
  wordsToNumber("триста двадцать два") ->  322
```

**numberToWords(num: number): string ** - переводит число в прописное значение:

```bash
  wordsToNumber("семьсот девяносто два триллиона девятьсот миллиардов триста два миллиона триста тысяч девятьсот девяносто один") ->  792900302300991
  
  wordsToNumber("девятьсот девяносто девять") ->  999
  
  wordsToNumber("один миллион триста тысяч девятьсот девяносто один") ->  1300991
```

**getCountCase(count: number, words: string[], withCount?: boolean): string ** - склоняет слова в зависимости от числа.

 **count** - числительное
 
 **words** - массив из трех элементов: 1-й элемент - склонение слова, если число равно 1, 2-й - если 2, 3-й - если 5
 
 **withCount** - возвращать строку с числительным или нет. По умолчанию **false**.

```bash
  getCountCase(1, ['рубль', 'рубля', 'рублей']) -> рубль
  
  getCountCase(8, ['рубль', 'рубля', 'рублей'], true) -> 8 рублей
  
  getCountCase(136, ['рубль', 'рубля', 'рублей'], true) -> 136 рублей
```
