(function(){
    let hamburger = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_SALAD);
    
    let buttonNew = document.getElementById('new-hamb');
    let buttonAdd = document.getElementById('add-topp');
    let buttonRemove = document.getElementById('remove-topp');
    let sizeInfo = document.getElementById('size-info');
    let stuffingInfo = document.getElementById('stuffing-info');
    let toppingInfo = document.getElementById('topping-info');
    let priceInfo = document.getElementById('price-info');
    let caloriesInfo = document.getElementById('calories-info');
    let errors = document.getElementById('right-errors');
    
    let newHamb = document.getElementById('new-hamburger');
    let addTopp = document.getElementByIdf('add-topping');
    let removeTopp = document.getElementById('remove-topping');
    
    let hambPopup = document.getElementById('popup-hamburger');
    let toppAddPopup = document.getElementById('popup-topping');
    let toppRmPopup = document.getElementById('popup-topping-rm');
    
    newHamb.onclick = e => {
        hambPopup.style.display = 'flex';
        toppRmPopup.style.display = 'none';
        toppAddPopup.style.display = 'none';
    };
    
    addTopp.onclick = e => {
        toppAddPopup.style.display = 'flex';
        hambPopup.style.display = 'none';
        toppRmPopup.style.display = 'none';
    };
    
    removeTopp.onclick = e => {
        toppRmPopup.style.display = 'flex';
        hambPopup.style.display = 'none';
        toppAddPopup.style.display = 'none';
    };
    
    buttonNew.onclick = e => {            
        hambPopup.style.display = 'none';
        
        let sizeValue = document.getElementById('hamburger-size').value;
        let stuffingValue = document.getElementById('hamburger-stuffing').value;
        
        let size = null;
        let stuffing = null;
        
        if(sizeValue == 'large') {
            size = Hamburger.SIZE_LARGE;
        } else {
            size = Hamburger.SIZE_SMALL;            
        }
        
        if(stuffingValue == 'cheese') {
            stuffing = Hamburger.STUFFING_CHEESE;
        } else if(stuffingValue == 'salad') {
            stuffing = Hamburger.STUFFING_SALAD;            
        } else {
            stuffing = Hamburger.STUFFING_POTATO;            
        }
        
        try {
            hamburger = new Hamburger(size, stuffing);
            
            showInfo();
        } catch (e) {
            if(e instanceof HamburgerException) {
                addError(e);
            }
        }
    };
    
    buttonAdd.onclick = e => {
        toppAddPopup.style.display = 'none';
        
        let toppingValue = document.getElementById('hamburger-topping').value;
        
        let topping = null;
        
        if(toppingValue == 'mayo') {
            topping = Hamburger.TOPPING_MAYO; 
        } else {   
            topping = Hamburger.TOPPING_SPICE;
        }
        
        try {
            hamburger.addTopping(topping);
            
            showInfo();
        } catch(e) {
            addError(e);
        }
    };
    
    buttonRemove.onclick = e => {
        toppRmPopup.style.display = 'none';
        
        let toppingValue = document.getElementById('hamburger-topping-rm').value;
        
        let topping = null;
        
        if(toppingValue == 'mayo') {
            topping = Hamburger.TOPPING_MAYO; 
        } else {   
            topping = Hamburger.TOPPING_SPICE;
        }
        
        try {
            hamburger.removeTopping(topping);
            
            showInfo();
        } catch(e) {
            addError(e);
        }
    };
    
    function showInfo() {
        sizeInfo.innerHTML = hamburger.getSize().name;
        stuffingInfo.innerHTML = hamburger.getStuffing().name;
        
        toppingInfo.innerHTML = '';
        
        hamburger.getToppings().forEach(topping => {
            let el = document.createElement('li');
            el.innerHTML = topping.name;
            
            toppingInfo.appendChild(el);            
        });
        
        priceInfo.innerHTML = hamburger.calculatePrice();
        caloriesInfo.innerHTML = hamburger.calculateCalories();
    }
    
    function addError(message) {
        let el = document.createElement('div');
        el.innerHTML = message;
        
        errors.appendChild(el);
    }
    
})();