import {
  addNumbersMap,
  multiplyNumbersMap,
  negativePrefix,
  thousandsSpecialEnds,
} from './constants'

const sortedDescNumbers = Object.keys(addNumbersMap)
  .concat(Object.keys(multiplyNumbersMap))
  .map((it) => Number(it))
  .sort((a, b) => b - a)

const findNumberByWord = (numbersMap, word) => {
  let number = 0

  for (const key of Object.keys(numbersMap)) {
    const words = numbersMap[key]

    if (words.includes(word)) {
      number = key
      break
    }
  }

  return +number
}

const getCountCase = (count, words, withCount = false) => {
  const value = Math.abs(count) % 100
  const num = value % 10
  let returnValue = words[2]

  if (value > 10 && value < 20) {
    returnValue = words[2]
  }
  if (num > 1 && num < 5) {
    returnValue = words[1]
  }
  if (num === 1) {
    returnValue = words[0]
  }
  return withCount ? `${count} ${returnValue}` : returnValue
}

const wordsToNumber = (words) => {
  if (typeof words !== 'string') {
    return undefined
  }

  const wordsArr = words.split(/\s+/)

  let number = 0
  for (const [index, wordNum] of wordsArr.entries()) {
    const addNum = findNumberByWord(addNumbersMap, wordNum)

    if (addNum) {
      number += addNum
    } else {
      const multiplyNum = findNumberByWord(multiplyNumbersMap, wordNum)

      if (multiplyNum) {
        if (number === 0) {
          number = 1
        }
        number *= multiplyNum

        number += wordsToNumber(wordsArr.slice(index + 1).join(' '))
        break
      }
    }
  }

  return words.startsWith(negativePrefix) ? -number : number
}

const numberToWords = (intNumber) => {
  let wordNumber = ''
  let number = intNumber

  if (!Number.isInteger(number)) {
    return wordNumber
  }
  if (number < 0) {
    wordNumber += `${negativePrefix} `
    number = Math.abs(number)
  }

  for (const num of sortedDescNumbers) {
    const addNum = addNumbersMap[num]
    const multiplyNum = multiplyNumbersMap[num]

    const closestNum = addNum?.[0] || multiplyNum?.[0]

    if (number === num) {
      if (multiplyNum) {
        const index = num === 1e3 ? 1 : 0
        wordNumber += `${addNumbersMap[1][index]} `
      }

      wordNumber += closestNum
      return wordNumber
    }

    if (number >= num) {
      if (addNum) {
        const remainder = number - num
        wordNumber += `${closestNum} `
        wordNumber += numberToWords(remainder)
      } else if (multiplyNum) {
        const remainder = number / num
        const intRemainder = Math.trunc(remainder)
        const stringRemainder = intRemainder.toString()
        const endsWithOne = stringRemainder.endsWith(1)
        const endsWithTwo = stringRemainder.endsWith(2)

        // Для чисел с подстрокой типа "одна тысяча" или "две тысячи" нужно особое согласование
        if (num === 1e3 && (endsWithOne || endsWithTwo)) {
          wordNumber += numberToWords(intRemainder)

          const endWord = wordNumber.substring(wordNumber.lastIndexOf(' ') + 1)

          if (thousandsSpecialEnds.includes(endWord)) {
            wordNumber = wordNumber.substring(0, wordNumber.lastIndexOf(' ') + 1)

            const mapIndex = endsWithOne ? 1 : 2

            wordNumber += addNumbersMap[mapIndex][1]
          }
        } else {
          wordNumber += numberToWords(intRemainder)
        }

        wordNumber += ` ${getCountCase(intRemainder, multiplyNum)} `

        const restPart = number - intRemainder * num

        if (restPart > 0) {
          wordNumber += numberToWords(restPart)
        }
      }
      break
    }
  }

  return wordNumber
}
