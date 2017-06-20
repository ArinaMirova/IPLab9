/**

* Класс, объекты которого описывают параметры гамбургера.

*

* @constructor

* @param size Размер

* @param stuffing Начинка

* @throws {HamburgerException} При неправильном использовании

*/

function Hamburger(size, stuffing) {
    if(!size) {
        throw new HamburgerException('No size given!'); 
    }
    
    if(!size.type || size.type !== 'size') {
        throw new HamburgerException('invalid size \'' + size.name + '\'');  
    }
    
    if(!stuffing) {
        throw new HamburgerException('No stuffing given!'); 
    }
    
    if(!stuffing.type || stuffing.type !== 'stuffing') {
        throw new HamburgerException('invalid stuffing \'' + stuffing.name + '\'');  
    }
    
    this.size = size;
    this.stuffing = stuffing;
    this.toppings = [];
}

/* Размеры, виды начинок и добавок */

Hamburger.SIZE_SMALL = {
    name: 'SIZE_SMALL',
    type: 'size',
    price: 50,
    calories: 20
};

Hamburger.SIZE_LARGE = {
    name: 'SIZE_LARGE',
    type: 'size',
    price: 100,
    calories: 40
};

Hamburger.STUFFING_CHEESE = {
    name: 'STUFFING_CHEESE',
    type: 'stuffing',
    price: 10,
    calories: 20
};

Hamburger.STUFFING_SALAD = {
    name: 'STUFFING_SALAD',
    type: 'stuffing',
    price: 20,
    calories: 5
};

Hamburger.STUFFING_POTATO = {
    name: 'STUFFING_POTATO',
    type: 'stuffing',
    price: 15,
    calories: 10
};

Hamburger.TOPPING_MAYO = {
    name: 'TOPPING_MAYO',
    type: 'topping',
    price: 20,
    calories: 5
};

Hamburger.TOPPING_SPICE = {
    name: 'TOPPING_SPICE',
    type: 'topping',
    price: 15,
    calories: 0
};

/**

* Добавить добавку к гамбургеру. Можно добавить несколько

* добавок, при условии, что они разные.

*

* @param topping Тип добавки

* @throws {HamburgerException} При неправильном использовании

*/

Hamburger.prototype.addTopping = function (topping) {
    if(!topping) {
        throw new HamburgerException('no topping given!');
    }
    
    if(!topping.type || topping.type != 'topping') {
        throw new HamburgerException('invalid topping \'' + topping.name + '\'');        
    }
    
    if(~this.toppings.indexOf(topping)) {
        throw new HamburgerException('duplicate topping \'' + topping.name + '\'');         
    }
    
    this.toppings.push(topping);   
};

/**

* Убрать добавку, при условии, что она ранее была

* добавлена.

*

* @param topping Тип добавки

* @throws {HamburgerException} При неправильном использовании

*/

Hamburger.prototype.removeTopping = function (topping) {
    if(!topping) {
        throw new HamburgerException('no topping given!');
    }
    
    if(!topping.type || topping.type != 'topping') {
        throw new HamburgerException('invalid topping \'' + topping.name + '\'');        
    }
    
    var index = this.toppings.indexOf(topping);
    
    if(!~index) {
        throw new HamburgerException('topping not exists \'' + topping.name + '\'');         
    }
    
    this.toppings.splice(index, 1);
};

/**

* Получить список добавок.

*

* @return {Array} Массив добавленных добавок, содержит константы

* Hamburger.TOPPING_*

*/

Hamburger.prototype.getToppings = function () {
    return this.toppings.slice();
};
/**

* Узнать размер гамбургера

*/

Hamburger.prototype.getSize = function () {
    return this.size;
};

/**

* Узнать начинку гамбургера

*/

Hamburger.prototype.getStuffing = function () {
    return this.stuffing;
};
/**

* Узнать цену гамбургера

* @return {Number} Цена в тугриках

*/

Hamburger.prototype.calculatePrice = function () {
    var price = this.size.price + this.stuffing.price;
    
    for(var i = 0; i < this.toppings.length; i++) {
        price += this.toppings[i].price;
    }
    
    return price;
};

/**

* Узнать калорийность

* @return {Number} Калорийность в калориях

*/

Hamburger.prototype.calculateCalories = function () {
    var calories = this.size.calories + this.stuffing.calories;
    
    for(var i = 0; i < this.toppings.length; i++) {
        calories += this.toppings[i].calories;
    }
    
    return calories;
};

/**

* Представляет информацию об ошибке в ходе работы с гамбургером.

* Подробности хранятся в свойстве message.

* @constructor

*/

function HamburgerException (message) {
    this.name = 'HamburgerException';
    this.message = message;
}

HamburgerException.prototype = Object.create(Error.prototype);