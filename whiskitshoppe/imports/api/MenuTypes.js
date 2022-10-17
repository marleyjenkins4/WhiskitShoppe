import {EJSON} from 'meteor/ejson'

// these are the custom defined types to store items in the session to form a "cart"
// For each menu type that has different parameters there will be a different type in order to store the 
// values needed for that type.

// Types will be capitalized. SizePrice currently refers to the index.

// new CookieBarSpecialty(string name, int quantity, int sizePrice, string special)
class CookieBarSpecialty {
    constructor(name, quantity, sizePrice, special="") {
        this.name = name;
        this.quantity = quantity;
        this.sizePrice = sizePrice;
        this.special = special;
    }

    // Convert our type to JSON.
    toJSONValue() {
        return {
            name: this.name,
            quantity: this.quantity,
            sizePrice: this.sizePrice,
            special: this.special,
        };
    }

    // Unique type name.
    typeName() {
        return 'CookieBarSpecialty';
    }
}

EJSON.addType('CookieBarSpecialty', function fromJSONValue(json) {
    return new CookieBarSpecialty(json.name, json.quantity, json.sizePrice, json.special);
});

// EJSON.stringify(new CookieBarSpecialty("Pecan Bars", 6, 0, ""));
// Returns '{"$type":"CookieBarSpecialty","$value":{"name":"Pecan Bar","Quantity":6, "sizePrice":0, "special":""}}'


// new Cake(string name, int quantity, int sizePrice, int tier, array cakeFlavors, string covering, array icingFlavors(null), string fondantType(null), array fillingFlavors(null), string topping(null), string messageLocation(null), string message(null), string special)
class Cake {
    constructor(name, quantity, sizePrice, tiers = 1, cakeFlavors = "", covering = "", icingFlavors = "", fondantType = "", fillingFlavors = "", topping="", message = "", messageLocation="", special="") {
        this.name = name;
        this.quantity = quantity;
        this.sizePrice = sizePrice;
        this.tiers = tiers;
        this.cakeFlavors = cakeFlavors;
        this.covering = covering;
        this.icingFlavors = icingFlavors;
        this.fondantType = fondantType;
        this.fillingFlavors = fillingFlavors;
        this.topping = topping;
        this.message = message;
        this.messageLocation = messageLocation;
        this.special = special;
    }

    // Convert our type to JSON.
    toJSONValue() {
        return {
            name: this.name,
            quantity: this.quantity,
            sizePrice: this.sizePrice,
            tiers: this.tiers,
            cakeFlavors: this.cakeFlavors,
            covering: this.covering,
            icingFlavors: this.icingFlavors,
            fondantType: this.fondantType,
            fillingFlavors: this.fillingFlavors,
            topping: this.topping,
            message: this.message,
            messageLocation: this.messageLocation,
            special: this.special,
        };
    }

    // Unique type name.
    typeName() {
        return 'Cake';
    }
}

EJSON.addType('Cake', function fromJSONValue(json) {
    return new Cake(json.name, json.quantity, json.sizePrice, json.tiers, json.cakeFlavors, json.covering, json.icingFlavors, json.fondantType, json.fillingFlavors, json.topping, json.message, json.messageLocation, json.special);
});

// new CupcakePie(string name, int quantity, int sizePrice, string flavor, string special)
class CupcakePie {
    constructor(name, quantity, sizePrice, flavor, special = "") {
        this.name = name;
        this.quantity = quantity;
        this.sizePrice = sizePrice;
        this.flavor = flavor;
        this.special = special;
    }

    // Convert our type to JSON.
    toJSONValue() {
        return {
            name: this.name,
            quantity: this.quantity,
            sizePrice: this.sizePrice,
            flavor: this.flavor,
            special: this.special,
        };
    }

    // Unique type name.
    typeName() {
        return 'CupcakePie';
    }
}

EJSON.addType('CupcakePie', function fromJSONValue(json) {
    return new CupcakePie(json.name, json.quantity, json.sizePrice, json.flavor, json.special);
});


export {CookieBarSpecialty, Cake, CupcakePie};
