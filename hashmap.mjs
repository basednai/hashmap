import { listNode } from "./listNode.mjs";

export class HashMap {
  buckets = new Array(16);

  size = this.buckets.length;
  rehashValue = 0.75 * this.size;

  hash = (key) => {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  };

  set = (key, value) => {
    let hashCode = this.hash(key) % this.size;
    boundsCheck(hashCode, this.buckets);
    let selected = this.buckets[hashCode]; // first node
    if (!selected) {
      this.buckets[hashCode] = new listNode(key, value);
      //   this.buckets[hashCode].toString();
    } else {
      while (selected.nextNode) {
        if (selected.key == key) {
          selected.value = value;
          return;
        }
        selected = selected.nextNode;
      }

      if (selected.key == key) selected.value = value;
      else selected.nextNode = new listNode(key, value);
    }

    if (this.length() > this.rehashValue) {
      console.log("rehash!");
      this.rehash();
    }
  };

  get = (key) => {
    let hashCode = this.hash(key) % this.size;
    boundsCheck(hashCode, this.buckets);
    let current = this.buckets[hashCode]; // first node

    while (current)
      if (current.key == key) return current.value;
      else current = current.nextNode;
    return null;
  };

  has = (key) => {
    let hashCode = this.hash(key) % this.size;
    boundsCheck(hashCode, this.buckets);
    let current = this.buckets[hashCode];

    while (current)
      if (current.key == key) return true;
      else current = current.nextNode;
    return false;
  };

  remove = (key) => {
    let hashCode = this.hash(key) % this.size;
    boundsCheck(hashCode, this.buckets);
    let current = this.buckets[hashCode];

    let head = current;
    if (current)
      if (current.nextNode == null) {
        if (current.key == key) {
          this.buckets[hashCode] = null;
          return true;
        }
      } else {
        let prev = current;
        while (current)
          if (current.key == key) {
            if (prev == current) this.buckets[hashCode] = current.nextNode;
            else prev.nextNode = current.nextNode;
              
            head.toString();
            return true;
          } else {
            prev = current;
            current = current.nextNode;
          }
      }
    return false;
  };

  length = () => {
    let count = 0;
    this.buckets.forEach((bucketNode) => {
      while (bucketNode) {
        count++;
        bucketNode = bucketNode.nextNode;
      }
    });
    return count;
  };

  clear = () => {
    this.buckets.fill(null);
  };

  keys = () => {
    let keys = [];
    this.buckets.forEach((bucketNode) => {
      while (bucketNode) {
        keys.push(bucketNode.key);
        bucketNode = bucketNode.nextNode;
      }
    });
    return keys;
  };

  values = () => {
    let values = [];
    this.buckets.forEach((bucketNode) => {
      while (bucketNode) {
        values.push(bucketNode.value);
        bucketNode = bucketNode.nextNode;
      }
    });
    return values;
  };

  entries = () => {
    let entries = [];
    this.buckets.forEach((bucketNode) => {
      while (bucketNode) {
        entries.push([bucketNode.key, bucketNode.value]);
        bucketNode = bucketNode.nextNode;
      }
    });
    return entries;
  };

  rehash = () => {
    let oldBuckets = this.buckets;
    this.buckets = new Array(this.size * 2);
    this.size = this.buckets.length;
    this.rehashValue = 0.75 * this.size;

    oldBuckets.forEach((bucketNode) => {
      while (bucketNode) {
        this.set(bucketNode.key, bucketNode.value);
        bucketNode = bucketNode.nextNode;
      }
    });
    oldBuckets.fill(null);
  };

  toString = () => {
    console.log();
    this.buckets.forEach((bucket) => {
      if (bucket) bucket.toString();
    });
    console.log();
  };
} // end class

function boundsCheck(index, buckets) {
  if (index < 0 || index >= buckets.length) {
    throw new Error("Trying to access index out of bound");
  }
}
