export class listNode {
  constructor(key = null, value = null, nextNode = null) {
    this.key = key;
    this.value = value;
    this.nextNode = this.nextNode;
  }

  toString = () => {

    let current = this;
    while (current) {
      process.stdout.write(`${current.key + ":" + current.value}`);
      current = current.nextNode;
      if (current) process.stdout.write(" -> ");
    }
    console.log();
  };
}