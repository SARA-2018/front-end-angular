import {Command} from './command.model';

export class LoadCommand extends Command {

  private readonly name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }

  execute() {
    const file = new File([this.name], `../test/src/${this.name}.txt`, {type: 'text/plain'});
    const reader = new FileReader();
    reader.readAsText(file);
    console.log(reader.result);
//    console.log(file);
//    const fileInput = (document.getElementById('fileInput'))['value'];

    /*console.log(fileInput);
    fileInput.addEventListener('change', function (e) {
      const file = fileInput.files[0];
      const textType = /text.*///;

    /* if (file.type.match(textType)) {
       const reader = new FileReader();
       console.log(reader.result);
       reader.readAsText(file);
     }
   });*/
  }
}
