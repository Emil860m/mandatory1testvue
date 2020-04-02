const functions = require('./HelloWorld');

 //setup
 var phoneToSelect = "";
 var phoneToDeselect = "";
 var phones = [];
 var internet = false;
 var phoneLines = 0;
 var phonePrices =
 {
     "Motorola G99": 800,
     "iPhone 99": 6000,
     "Samsung Galaxy 99": 1000,
     "Sony Xperia 99": 900,
     "Huawei 99": 900
 };



test('test price', () => 
{
    functions.selectPhone(phones, "Motorola G99");
    functions.selectPhone(phones, "Samsung Galaxy 99");
    expect(functions.price(internet, phoneLines, phones, phonePrices)).toBe(1800);
    expect(functions.price(internet, phoneLines, phones, phonePrices)).not.toBe(1801);
    expect(functions.price(internet, phoneLines, phones, phonePrices)).not.toBe(1799);
    expect(functions.price(internet, phoneLines, phones, phonePrices)).not.toBe("a string");


    functions.deselectPhone(phones, "Motorola G99");
    expect(functions.price(internet, phoneLines, phones, phonePrices)).toBe(1000);

    internet = true;
    expect(functions.price(internet, phoneLines, phones, phonePrices)).toBe(1200);


    phoneLines = 3;
    expect(functions.price(internet, phoneLines, phones, phonePrices)).toBe(1650);

    phoneLines = 0;
    internet = false;
    phones = [];
});


// Data provider with jest
describe('phonePrices - each', () => {
    test.each([
        ['Motorola G99' , 800 , true],
        ['Samsung Galaxy 99' ,  1000 , true],
        ['Motorola G99' ,  800, true]
    ])('selectPhone (phones, "%s") - %s', (input, expectedPrice , boolResult) => {

        // Reset phones per test
        phones = [];

        functions.selectPhone(phones, input)

        const result = functions.price(internet, phoneLines, phones, phonePrices)

        if ( result == expectedPrice)
        {
            boolResult = true;
        }
        else
        {
            boolResult = false;
        }

        expect(boolResult).toBe(true)
    }),

    test.each([
        ['Motorola G99','Samsung Galaxy 99' , 800 + 1000 , true],
        ['Samsung Galaxy 99','iPhone 99' ,  1000 + 6000 , true ],
        ['Motorola G99','Huawei 99' , 800 + 900 , true]
    ])('selectPhone (phones, "%s" + "%s") - %s', (input1, input2, expectedPrice , boolResult) => {

        // Reset phones per test
        phones = [];

        functions.selectPhone(phones, input1)
        functions.selectPhone(phones, input2)

        const result = functions.price(internet, phoneLines, phones, phonePrices)
        
        if ( result == expectedPrice)
        {
            boolResult = true;
        }
        else
        {
            boolResult = false;
        }

        expect(boolResult).toBe(true)
    })
})
