import { listNode } from "./listNode.mjs";

export class LinkedList {
  constructor(head = null) {
    this.head = head;
    this.tail = head;
  }

  totalNodes = 0;

  append = (value) => {
    if (this.head == null) {
      this.head = new listNode(value);
      this.tail = this.head;
    } else {
      this.tail.nextNode = new listNode(value);
        this.tail = this.tail.nextNode;
        // this.tail.nextNode = null
    }
    this.totalNodes++;
  };

  prepend = (value) => {
    let newHead = new listNode(value);
    newHead.nextNode = this.head;
    this.head = newHead;
    this.totalNodes++;
  };

  toString = () => {
    console.log("\nprinting list");

    let current = this.head;
    while (current) {
      process.stdout.write(`${current.value}`);
      current = current.nextNode;
      if (current) process.stdout.write(" -> ");
    }
    console.log();
  };

  size = () => this.totalNodes;

  getHead = () => this.head;

  getTail = () => this.tail;

  at = (index) => {
    let i = 0;
    let current = this.head;
    while (i < index && current) {
      current = current.nextNode;
      i++;
    }
    return current;
  };

  pop = () => {
    if (this.size() > 1) {
      this.tail = this.at(this.size() - 2);
      this.tail.nextNode = null;
    } else this.head = null;

    this.totalNodes--;
  };

  contains = (value) => {
    let current = this.head;
    while (current) {
      if (value == current.value) return true;
      current = current.nextNode;
    }
    return false;
  };

    find = (value) => {
        let i = 0;
        let current = this.head;
        while (current) {
          if (value == current.value) return i;
            current = current.nextNode;
            i++
        }
        return null;
  }
}
