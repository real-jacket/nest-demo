import { IsInt, Length, MaxLength, MinLength } from 'class-validator';
export class CreateDddDto {
  @Length(10, 20, {
    message(args) {
      console.log(args);
      return '长度不符合10～20的要求';
    },
  })
  name: string;

  @IsInt()
  age: number;
  sex: boolean;
  hobbies: Array<string>;
}
