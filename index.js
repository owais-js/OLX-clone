takedata();
function takedata(){
    fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(res =>{
 
        console.log(res);
        const products =  res.products;
        const container = document.getElementById('card-container');

        for( let i=0; i<products.length; i++){
            const card = document.createElement('div')
            card.className = 'card' 
            card.onclick = function(){
                window.location.href = './products/product.html?productId='+ products[i].id;
            }


            const imageElement = document.createElement('img')
            imageElement.src= products[i].thumbnail;
        

            const title = document.createElement('h3')
            title.innerHTML= products[i].title;
        
            
            const price = document.createElement('h4')
            price.innerHTML= ("Rs. " + products[i].price);


            card.append(imageElement);
            card.append(title);
            card.append(price);

            container.append(card);
        }

    }
)}
function sell(){
    window.location='../Ads/ads.html';
}