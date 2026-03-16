const container = document.getElementById("crypto-container");

// 40 popular coins
const coins = [
"bitcoin","ethereum","tether","bnb","solana","xrp","usd-coin","dogecoin","cardano","tron",
"toncoin","avalanche-2","chainlink","polkadot","polygon","litecoin","shiba-inu","dai","bitcoin-cash","uniswap",
"leo-token","cosmos","stellar","okb","filecoin","internet-computer","aptos","near","vechain","maker",
"arbitrum","optimism","render-token","the-graph","aave","theta-token","sandbox","axie-infinity","tezos","algorand"
];

// get last 7 days price data
async function fetchCoinData(coin) {
    const url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=7`;

    const res = await fetch(url);
    const data = await res.json();

    return data.prices;
}

async function createChart(coin) {

    const prices = await fetchCoinData(coin);

    const labels = prices.map(p =>
        new Date(p[0]).toLocaleDateString()
    );

    const values = prices.map(p => p[1]);

    const chartWrapper = document.createElement("div");
    chartWrapper.style.width = "400px";
    chartWrapper.style.margin = "20px";

    const title = document.createElement("h3");
    title.innerText = coin;

    const canvas = document.createElement("canvas");

    chartWrapper.appendChild(title);
    chartWrapper.appendChild(canvas);
    container.appendChild(chartWrapper);

    new Chart(canvas, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: coin + " price",
                data: values,
                borderWidth: 2,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

async function init() {
    for (let coin of coins) {
        createChart(coin);
    }
}

init();
