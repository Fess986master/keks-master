function sayName() {
  console.log (this.name);   //  this - это указание контекста. Теперь при запуске метода-функции, в аргумент попадает то что до "."
}

const myDog = {
  "name": "Fess",
  "legs": 4,
  "tails": 0,
  "friends": ["me",2],
  sayName
};

myDog.sayName();   //  из за того что у функции прописан контекст, можно обращаться без аргумента
