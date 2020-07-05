"use strict";

const memoryClass = require("./memory");
const memory = new memoryClass();

class Array {
  constructor() {
    this.length = 0;
    this._capacity = 0;
    this.ptr = memory.allocate(this.length);
  }

  push(value) {
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    memory.set(this.ptr + this.length, value);
    this.length++;
  }

  _resize(size) {
    const oldPtr = this.ptr;
    this.ptr = memory.allocate(size);
    if (this.ptr === null) {
      throw new Error("Out of memory");
    }
    memory.copy(this.ptr, oldPtr, this.length);
    memory.free(oldPtr);
    this._capacity = size;
  }

  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index error");
    }
    return memory.get(this.ptr + index);
  }

  pop() {
    if (this.length === 0) {
      throw new Error("Index error");
    }
    const value = memory.get(this.ptr + this.length - 1);
    this.length--;
    return value;
  }

  insert(index, value) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index error");
    }

    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
    memory.set(this.ptr + index, value);
    this.length++;
  }

  remove(index) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index error");
    }
    memory.copy(
      this.ptr + index,
      this.ptr + index + 1,
      this.length - index - 1
    );
    this.length--;
  }
}

// Array Drills

function main() {
  Array.SIZE_RATIO = 3;

  // create an instance of the array class
  let arr = new Array();

  // -- #1 --
   arr.push(3);

   console.log(arr);

  // What is the length, capacity and memory address of your array?
  // Array { length: 1, _capacity: 3, ptr: 0 }
  // length of 1 item, two empty spaces, array starts at ptr 0

  // -- #2 --
  // arr.push(3);
  // arr.push(5);
  // arr.push(15);
  // arr.push(19);
  // arr.push(45);
  // arr.push(10);

  // console.log(arr);

  // What is the length, capacity and memory address of your array?
  // Array { length: 6, _capacity: 12, ptr: 3 }
  // 6 items, capacity: (3 + 1) * 4 after resizing, ptr moved to the next available memory address

  // -- #3 --
//   arr.push(3);
//   arr.push(5);
//   arr.push(15);
//   arr.push(19);
//   arr.push(45);
//   arr.push(10);

//   arr.pop();
//   arr.pop();
//   arr.pop();

//   console.log(arr);

  // What is the length, capacity and memory address of your array ?
  // Array { length: 3, _capacity: 12, ptr: 3 }
  // The length before .pop() was ran was greater than the capacity so it resized the array and relocated it to ptr 3.
  // .pop removed the last three items but did not move back to ptr 3 because it is unnecessary to do so.

  // -- #4 --
  // Print the first item in the array arr.
  // console.log(arr.get(0));

  // -- #5 --
  // Empty the array and add just one item arr.push('tauhida');

//   console.log(arr.length);
//   for (let i = 0; i <= arr.length + 1; i++) {
//     console.log("pop running" + i);
//     arr.pop();
//   }
//   arr.push("tauhida");
//   console.log(arr);
//   console.log(arr.get(0));
 }

main();
