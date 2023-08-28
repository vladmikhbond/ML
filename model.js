const A = 4;  // addresss length

class Model 
{
   static KEY = 'ML_key'

   constructor(size) {
      this.size = size;
      this.memo = new Array(this.size).fill(0);
      this.counter = 0;
      this.summator = 0;
      let m = localStorage.getItem(Model.KEY)
      if (m) {
         this.memo = JSON.parse(m);
      } else {
         this.memo = new Array(this.size).fill(0);
      }
   }
   
   
   step() {
      let command = + (this.memo[this.counter] / 10**A) | 0;
      let address = + (this.memo[this.counter]) % 10**A;
      this.counter++;
      switch (command) {
         case 1:  // 01 - зчитати з пам'яті
            this.summator = +this.memo[address];
            break;
         case 2:  // 02 - записати в пам'ять
            this.memo[address] = +this.summator;
            break;
         case 11:  // 11 - додати до суматора
            this.summator += +this.memo[address];
            break;
         case 12:  // 12 - помножити на суматор
            this.summator *= +this.memo[address];
            break;
         case 20: // 20 - перейти
            this.counter = address;
            break;
         case 21: // 21 - перейти, якщо сум < 0
            if (this.summator < 0) this.counter = address;
            break;
         case 22: // 22 - перейти, якщо сум < 0
            if (this.summator == 0) this.counter = address;
            break;
         case 23: // 23 - перейти, якщо сум < 0
            if (this.summator > 0) this.counter = address;
            break;
      }
   }

   save() {
      localStorage.setItem(Model.KEY, JSON.stringify(this.memo));
   }
}

