import {Command} from './command.model';

export class LoadCommand extends Command {

  private readonly name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }

  execute() {

    const parts = [
      new Blob(['you construct a file...'], {type: 'text/plain'})
    ];

    const file = new File(parts, this.name + '.txt', {type: 'text/plain'});
    console.log(file)
    const reader = new FileReader();
    reader.onload = function() {
      console.log(this.result);
    }
    reader.readAsText(file);

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
