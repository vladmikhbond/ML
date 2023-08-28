
const model = new Model(25);
initGUI();
show();

counter.addEventListener('change', () => {model.counter = counter.value; show(); } );
summator.addEventListener('change', () => {model.summator = +summator.value; } );
stepBtn.addEventListener('click', () => {model.step(); show(); } );
saveBtn.addEventListener('click', () => {model.save(); show(); } );


function initGUI() 
{
   for (let i = 0; i < model.size; i++) 
   {
      const div = document.createElement("div");
      div.innerHTML = `<label>${('000' + i).slice(-4)} </label>` +
      `<input id="a${i}" type="text" </input>` +
      `<span style="display: none"> ◄ </span>`
      memo.appendChild(div);

      div.children[1].addEventListener('change', function() {
         let i = this.id.slice(1);
         this.style.color =  model.memo[i] == this.value ? "black" : "red";
         model.memo[i] = +this.value.replace(/\s/, '');
         show();
      });
   }
}

function show() {
   const counter = document.getElementById('counter');
   const summator = document.getElementById('summator');
   counter.value = model.counter;
   summator.value = model.summator;
   
   for (let i = 0; i < model.size; i++) 
   {
      const el = document.getElementById('a' + i);
      let oldValue = str2num(el.value);
      el.style.color = 
         model.memo[i] == 0 ? "gray" : 
         model.memo[i] == oldValue ? "black" : 
         "red";
      el.value = num2str(model.memo[i]);
      
      // set pointer
      el.nextSibling.style.display = i == model.counter ? "inline" : "none";
   }
}


function num2str(num) {
   let s = Math.abs(num).toString().padStart(6, '0');
   s = s.slice(0, 2) + ' ' + s.slice(2);
   if (num < 0) 
      s = '-' + s;
   return s;
}

function str2num(str) {
   str = str.replace(/\s/, '');
   if (str.startsWith('-')) 
      return -str.slice(1);
   return +str;
}

