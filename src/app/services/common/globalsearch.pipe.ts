import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'globalsearchPipe'
})
export class GlobalPipePipe implements PipeTransform {

  transform(value: any,args:any): any {
   
    if(!value)return null;
    if (!args) return value;
    
   return value.filter(function(item){
       return JSON.stringify(item).toLowerCase().includes(args.toLowerCase());
   });
 }

}