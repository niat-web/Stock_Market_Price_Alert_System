/* script.js */
 document.addEventListener('DOMContentLoaded', () => {
  // Dark Mode Toggle
  const darkModeSwitch = document.getElementById('dark-mode-switch');
  const body = document.body;
 

  const enableDarkMode = () => {
  body.setAttribute('data-theme', 'dark');
  localStorage.setItem('theme', 'dark');
  };
 

  const disableDarkMode = () => {
  body.removeAttribute('data-theme');
  localStorage.setItem('theme', 'light');
  };
 

  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'dark') {
  enableDarkMode();
  darkModeSwitch.checked = true;
  }
 

  darkModeSwitch.addEventListener('change', () => {
  if (darkModeSwitch.checked) {
  enableDarkMode();
  } else {
  disableDarkMode();
  }
  });
 

  // Form Validation
  const alertForm = document.getElementById('alert-form');
  const alertSymbolInput = document.getElementById('alertSymbol');
  const alertPriceInput = document.getElementById('alertPrice');
  const notificationDiv = document.getElementById('notification');
  const clearFormButton = document.getElementById('clear-form');
 

  alertForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let isValid = true;
 

  if (!alertSymbolInput.value.trim()) {
  alertSymbolInput.classList.add('is-invalid');
  isValid = false;
  } else {
  alertSymbolInput.classList.remove('is-invalid');
  }
 

  if (!alertPriceInput.value.trim() || isNaN(alertPriceInput.value)) {
  alertPriceInput.classList.add('is-invalid');
  isValid = false;
  } else {
  alertPriceInput.classList.remove('is-invalid');
  }
 

  if (isValid) {
  const symbol = alertSymbolInput.value.trim().toUpperCase();
  const price = parseFloat(alertPriceInput.value);
  const alertType = document.querySelector('input[name="alertType"]:checked').value;
 

  displayNotification(`Alert set for ${symbol} when price goes ${alertType} $${price}`);
  alertForm.reset(); // Clear the form
  }
  });
 

  clearFormButton.addEventListener('click', () => {
  alertForm.reset();
  alertSymbolInput.classList.remove('is-invalid');
  alertPriceInput.classList.remove('is-invalid');
  });
 

  function displayNotification(message) {
  notificationDiv.textContent = message;
  notificationDiv.style.display = 'block';
  setTimeout(() => {
  notificationDiv.style.display = 'none';
  }, 3000);
  }
 

  // Stock Data Display
  const stockSymbolSelect = document.getElementById('stockSymbol');
  const stockDataDisplay = document.getElementById('stock-data-display');
  const refreshDataButton = document.getElementById('refresh-data');
  const currentPriceElement = document.getElementById('current-price');
  const highTodayElement = document.getElementById('high-today');
  const lowTodayElement = document.getElementById('low-today');
 

  async function fetchData(url) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return await response.json();
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching data directly:', error);
      const proxyUrl = `https://api.allorigins.win/raw?url=${url}`;
      const proxyResponse = await fetch(proxyUrl);
      if (proxyResponse.ok) {
        console.log('Using AllOrigins proxy');
        return await proxyResponse.json();
      } else {
        console.error('Error fetching data via proxy:', error);
        return null;
      }
    }
  }
 

  const updateStockData = async () => {
  const symbol = stockSymbolSelect.value;
  const apiKey = 'M5C9OZ2HTF8IAO7B'; // Replace with your actual API key
  const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`;
  
  const data = await fetchData(apiUrl);
 

  if (data && data['Time Series (5min)']) {
  const timeSeries = data['Time Series (5min)'];
  const timeStamps = Object.keys(timeSeries);
  const latestTimeStamp = timeStamps[0];
  const latestData = timeSeries[latestTimeStamp];
 

  const open = parseFloat(latestData['1. open']);
  const high = parseFloat(latestData['2. high']);
  const low = parseFloat(latestData['3. low']);
  const close = parseFloat(latestData['4. close']);
 

  currentPriceElement.textContent = `$${close.toFixed(2)}`;
  highTodayElement.textContent = `$${high.toFixed(2)}`;
  lowTodayElement.textContent = `$${low.toFixed(2)}`;
  
  // Prepare and display the data
  const dataArray = Object.entries(timeSeries).map(([timestamp, values]) => ({
  timestamp,
  open: parseFloat(values["1. open"]),
  high: parseFloat(values["2. high"]),
  low: parseFloat(values["3. low"]),
  close: parseFloat(values["4. close"]),
  volume: parseInt(values["5. volume"]),
  }));
 

  // Shuffle the data for a different dataset
  const shuffledData = dataArray.sort(() => Math.random() - 0.5);
  
  // Display the shuffled data
  displayStockData(shuffledData);
  } else {
  stockDataDisplay.textContent = 'Failed to fetch stock data.';
  currentPriceElement.textContent = '$--';
  highTodayElement.textContent = '$--';
  lowTodayElement.textContent = '$--';
  }
  };
 

  const displayStockData = (stockData) => {
  stockDataDisplay.innerHTML = ''; // Clear previous data
 

  const table = document.createElement('table');
  table.className = 'table table-striped';
 

  const thead = document.createElement('thead');
  thead.innerHTML = `
  <tr>
  <th>Timestamp</th>
  <th>Open</th>
  <th>High</th>
  <th>Low</th>
  <th>Close</th>
  <th>Volume</th>
  </tr>
  `;
  table.appendChild(thead);
 

  const tbody = document.createElement('tbody');
  stockData.slice(0, 10).forEach(dataPoint => { // Display only first 10 for brevity
  const row = document.createElement('tr');
  row.innerHTML = `
  <td>${dataPoint.timestamp}</td>
  <td>$${dataPoint.open.toFixed(2)}</td>
  <td>$${dataPoint.high.toFixed(2)}</td>
  <td>$${dataPoint.low.toFixed(2)}</td>
  <td>$${dataPoint.close.toFixed(2)}</td>
  <td>${dataPoint.volume}</td>
  `;
  tbody.appendChild(row);
  });
 

  table.appendChild(tbody);
  stockDataDisplay.appendChild(table);
  };
 

  refreshDataButton.addEventListener('click', updateStockData);
  stockSymbolSelect.addEventListener('change', updateStockData); // Update on symbol change
  updateStockData(); // Initial load
 

  // Example of using arrays and objects
  const stocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', lastPrice: 170.34 },
  { symbol: 'GOOG', name: 'Alphabet Inc.', lastPrice: 2500.50 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', lastPrice: 300.00 }
  ];
 

  const highPricedStocks = stocks.filter(stock => stock.lastPrice > 200);
  console.log('High Priced Stocks:', highPricedStocks);
 

  const stockPrices = stocks.map(stock => stock.lastPrice);
  console.log('Stock Prices:', stockPrices);
 

  const totalPrice = stockPrices.reduce((sum, price) => sum + price, 0);
  console.log('Total Price of All Stocks:', totalPrice);
 });