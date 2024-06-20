import {Pipe, PipeTransform} from "@angular/core";


@Pipe({
  standalone: true,
  name: 'truncatechars'
})
export class TruncateCharsPipe implements PipeTransform{
  transform(value: any, limit: number = 20, trail: string = '...', croppedString: string = ''): string {
    croppedString = value.length > limit ? value.substring(0, limit) + trail: value
    return croppedString
  }
}
