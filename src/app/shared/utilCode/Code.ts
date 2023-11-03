import {v4 as uuidv4} from 'uuid'

  export const  GenerateUrl=(...urlNames: string[]): string =>urlNames.join('/');
  export const GenerateUrlName=(defaultName:string)=> 
 defaultName;
 //uuidv4().replace(/-/g,'');

