let objInc = {},
  objExp = {};

//Object to control income, debt, and difference - Header display
const vcontrol = {
  income: function () {
    var x = document.querySelectorAll('.cost--income');
    var y = 0;
    for (let i = 0; i < x.length; i++) {
      y += parseInt(x[i].innerText.slice(1), 10);
    }
    return y;
  },
  debt: function () {
    var x = document.querySelectorAll('.cost--debt');
    var y = 0;
    for (let i = 0; i < x.length; i++) {
      y += parseInt(x[i].innerText.slice(1), 10);
    }
    return y;
  },
  diff: function () {
    var x = this.income() - this.debt();
    if (x > 0) {
      // return `+${x}`;
      return `+${(x).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
    } else {
      return `${(x).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
    }
  },
};

//Set LocalStorage
const setStg = () => {
  const inc = document.querySelectorAll('.income .line-item');
  const exp = document.querySelectorAll('.expenses .line-item');

  for (let i = 0; i < inc.length; i++) {
    objInc[inc[i].querySelector('.description').innerText] = inc[i].querySelector('.cost').innerText.slice(1);
  }
  for (let i = 0; i < exp.length; i++) {
    objExp[exp[i].querySelector('.description').innerText] = exp[i].querySelector('.cost').innerText.slice(1);

  }
  localStorage.setItem('expenses', JSON.stringify(objExp));
  localStorage.setItem('income', JSON.stringify(objInc));

};
//Load Lists
const getStg = () => {
  let inc = JSON.parse(localStorage.getItem('income'));
  let exp = JSON.parse(localStorage.getItem('expenses'));

  for (key in inc) {
    modList('+', key, inc[key]);
  }
  for (key in exp) {
    modList('-', key, exp[key]);
  }

};

//Add items to their respective lists
const modList = (vType, desc, amnt) => {
  if (vType === '+') { //POSITIVE AMNT
    var item = document.createElement('div');
    item.className = 'line-item';
    item.innerHTML = `<p class="description description--income">${desc}</p>
    <p class="cost cost--income">\$${amnt}</p>
    <p class="trash">X</p>`;
    document.querySelector('.income').appendChild(item);

  } else { //NEGATIVE AMNT
    var item = document.createElement('div');
    item.className = 'line-item';
    item.innerHTML = `<p class="description description--debt">${desc}</p>
    <p class="cost cost--debt">\$${amnt}</p>
    <p class="trash">X</p>`;
    document.querySelector('.expenses').appendChild(item);
  }
};


const renderBalance = () => {
  document.querySelector('.amnt').innerHTML = vcontrol.diff();
  document.querySelector('.heading__secondary--income').innerHTML = vcontrol.income().toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  document.querySelector('.heading__secondary--expense').innerHTML = vcontrol.debt().toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};


//Load difference + Load Lists
window.onload = () => {
  getStg();
  renderBalance();

};

//Control user input
document.addEventListener('keypress', (evt) => {
  const vType = document.querySelector('#income-type').value;
  let desc = document.querySelector('.form__input--desc').value;
  let amnt = parseInt(document.querySelector('.form__input--value').value, 10);
  if (evt.key === 'Enter') {
    if (desc === '' && amnt === '') {
      alert('Please ensure you\'ve entered valid values for each item');
    } else {
      modList(vType, desc, amnt);
      setStg();
      document.querySelector('.amnt').innerHTML = vcontrol.diff();
      document.querySelector('.heading__secondary--income').innerHTML = vcontrol.income().toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
      document.querySelector('.heading__secondary--expense').innerHTML = vcontrol.debt().toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
  }
});

//.trash does not load with page, keep looking for .trash to add eventListeners
const intv = setInterval(() => {
  //If user opts to delete item
  document.querySelectorAll('.trash').forEach(function (evt, index) {
    evt.addEventListener('mousedown', function (el) {
      this.parentElement.remove();
      setStg();
      renderBalance();
    });
  });
  // }
}, 1000);




