import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'wordUpper'
})
export class WordUpperPipe implements PipeTransform {

  transform(value: string, wordParts: string[]): string {
    let result = value;
    wordParts.forEach(wordPart => {
      result = result.replace( new RegExp('\[А-Яа-я]*' + wordPart[0].toUpperCase() + wordPart.slice(1) + '[а-я]*|[А-Яа-я]*' + wordPart + '[а-я]*', 'g'), (match: string) => {
        return match.toUpperCase();
      });
    });
    return result;
  }
}
