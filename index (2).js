
import { getAds } from './config.js'

renderAds()


async function renderAds() {
    const ads = await getAds();
    const container = document.getElementById('card-container');

    for (var i = 0; i < ads.length; i++) {
        const ad = ads[i];

        const card = document.createElement('div');
        card.className = 'card';
        card.style.boxShadow = '0px 5px 5px 5px gray';
        card.style.background = 'lightcyan';
        card.style.width = '350px';
        card.style.borderRadius = '20px';
        card.onclick = function () {
            location.href = './products/product.html?adId=' + ad.id;
        };

        const img = document.createElement('img');
        img.src = ad.image;
        img.style.width = '326px';
        img.className = 'images';
        img.style.height = '200px';

        const title = document.createElement('h3');
        title.innerHTML = ad.title;
        title.style.textAlign = 'center';
        title.style.background = 'white';

        const amount = document.createElement('h4');
        amount.innerHTML = `Rs. ${ad.amount}`;
        amount.style.textAlign = 'center';
        amount.style.background = 'red';

        card.append(img);
        card.append(title);
        card.append(amount);

        container.append(card);
    }
}
