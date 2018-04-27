export class Units {

  name: string;

  constructor() {
  }

  public names(name: string) {
    this.name = name;
    return this;
  }

  toJson() {
    return {name: this.name};
  }
}
