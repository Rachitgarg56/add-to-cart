const cart = document.querySelector('#right>table>tbody');
const counterButtons = document.querySelectorAll('.btn-counter');
const total = document.querySelector('#total>h2>span');
let cartItems = [];
let sum = 0;

function handlerFunc(e) {

            sum = 0;
            cart.innerHTML = "";
    
            // increment/decrement counter
            var trEle = e.target.parentNode.parentNode.parentNode;
            var productName = trEle.querySelector('td:first-child').innerText;//product-name

            let counter;//counts
            var add;
            if (e.target.innerText == '+') {
                add = true;
                counter = e.target.previousElementSibling;
                counter.innerText = Number(counter.innerText) + 1;
            } else if (e.target.innerText == '-') {
                add = false;
                counter = e.target.nextElementSibling;
                if (counter.innerText != '0') {
                    counter.innerText = Number(counter.innerText) - 1;
                }
            }

            var price = Products.filter((p) => {//price
                return (p.name == productName);
            })[0].price;



            //alter the cartItems array
            if (add != undefined) {

                let prod = cartItems.find((p) => {
                    return p.pName == productName;
                });
    
                if (prod == undefined) {
                    if (add) {
                        cartItems.push({
                            pName: productName,
                            count: counter.innerText,
                            price: price
                        });
                    }
                } else {
                    if (add) {
                        prod.count = Number(prod.count) + 1;
                    } else {
                        prod.count = Number(prod.count) - 1;

                        if (Number(prod.count) <= 0) {
                            const idx = cartItems.indexOf(prod);
                            cartItems.splice(idx,1)
                        }

                    }
                }

            }


            function addItem(item) {
                var row = document.createElement('tr');
                var product = document.createElement('td');
                var productSum = document.createElement('td');

                product.innerText = item.pName;
                productSum.innerText = `${item.count} x ${item.price}`;
                row.appendChild(product);
                row.appendChild(productSum);
                cart.appendChild(row);
            }


            // add rows to U.I. using  cartItems arr
            cartItems.forEach((item) => {
                addItem(item);
            });

            cartItems.forEach((item) => {
                sum += (Number(item.count) * Number(item.price));
            });

            if (cartItems.length > 0) document.querySelector('h3').style.display = 'none';
            else document.querySelector('h3').style.display = 'block';

            total.innerHTML = sum;

            // console.log(productName,counter.innerText,price);
    

}

counterButtons.forEach((counterBtn) => {
    counterBtn.addEventListener('click', handlerFunc);
});

