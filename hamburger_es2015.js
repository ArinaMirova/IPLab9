let Hamburger = (function(){
    'use strict';
    
    class Hamburger_size {
        constructor(name, price, calories) {
            this.name = name;
            this.price = price;
            this.calories = calories;
        }
    } 
    

    class Hamburger_stuffing {
        constructor(name, price, calories) {
            this.name = name;
            this.price = price;
            this.calories = calories;
        }
    }

    class Hamburger_topping {
        constructor(name, price, calories) {
            this.name = name;
            this.price = price;
            this.calories = calories;
        }
    }
    
    let size_small = new Hamburger_size('small', 50, 20),
        size_large = new Hamburger_size('large', 100, 40),
        stuffing_cheese = new Hamburger_stuffing('cheese', 10, 20),
        stuffing_salad = new Hamburger_stuffing('salad', 20, 5),
        stuffing_potato = new Hamburger_stuffing('potato', 15, 10),
        topping_mayo = new Hamburger_topping('mayo', 20, 5),
        topping_spice = new Hamburger_topping('spice', 15, 0);

    class Hamburger {
        constructor(size, stuffing) {
            if(!size) {
                throw new HamburgerException('No size given!'); 
            }

            if(!(size instanceof Hamburger_size)) {
                throw new HamburgerException(`invalid size '${size.name}'`);  
            }

            if(!stuffing) {
                throw new HamburgerException('No stuffing given!'); 
            }

            if(!(stuffing instanceof Hamburger_stuffing)) {
                throw new HamburgerException(`invalid stuffing '${stuffing.name}'`);  
            }

            this.size = size;
            this.stuffing = stuffing;
            this.toppings = [];
        }

        addTopping(topping) {
            if(!topping) {
                throw new HamburgerException('no topping given!');
            }

            if(!(topping instanceof Hamburger_topping)) {
                throw new HamburgerException(`invalid topping '${topping.name}'`);        
            }

            let topp = this.toppings.find(t => {
                return t.name === topping.name;
            });

            if(topp) {
                throw new HamburgerException(`duplicate topping '${topping.name}'`); 
            }

            this.toppings.push(topping);  
        }

        removeTopping(topping) {
            if(!topping) {
                throw new HamburgerException('no topping given!');
            }

            if(!(topping instanceof Hamburger_topping)) {
                throw new HamburgerException(`invalid topping '${topping.name}'`);        
            }

            let length = this.toppings.length;

            this.toppings = this.toppings.filter(t => {
                return t !== topping;
            });

            if(length === this.toppings.length) {
                throw new HamburgerException(`topping not exists '${topping.name}'`);
            }
        }

        getToppings() {
            return this.toppings.slice();
        }

        getSize() {
            return this.size;
        }

        getStuffing(){
            return this.stuffing;
        }

        calculatePrice() {
            let price = this.size.price + this.stuffing.price;

            this.toppings.forEach(topping => {
                price += topping.price;
            });

            return price;
        }

        calculateCalories() {
            let calories = this.size.calories + this.stuffing.calories;

            this.toppings.forEach(topping => {
                calories += topping.calories;
            });

            return calories;
        }

        static get SIZE_SMALL() {
            return size_small;
        }
        static get SIZE_LARGE() {
            return size_large;
        }
        static get STUFFING_CHEESE() {
            return stuffing_cheese;
        }
        static get STUFFING_SALAD() {
            return stuffing_salad;
        }
        static get STUFFING_POTATO() {
            return stuffing_potato;
        }
        static get TOPPING_MAYO() {
            return topping_mayo;
        }
        static get TOPPING_SPICE() {
            return topping_spice;
        }  
    }
    
    return Hamburger;
})();

class HamburgerException extends Error {
    constructor(message) {
        super();

        this.name = 'HamburgerException';
        this.message = message;
    }
}