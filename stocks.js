function getStockData() {
    const ticker = document.getElementById('ticker').value.toUpperCase();
    const days = document.getElementById('days').value;
    const apiKey = 'YOUR_POLYGON_API_KEY';
    const toDate = new Date().toISOString().split('T')[0];
    const fromDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    fetch(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${fromDate}/${toDate}?adjusted=true&sort=asc&apiKey=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        const labels = data.results.map(d => new Date(d.t).toLocaleDateString());
        const values = data.results.map(d => d.c);
        new Chart(document.getElementById('stockChart'), {
          type: 'line',
          data: {
            labels,
            datasets: [{ label: ticker, data: values }]
          }
        });
      });
  }
  
  fetch('https://tradestie.com/api/v1/apps/reddit?date=2022-04-03')
    .then(res => res.json())
    .then(data => {
      const table = document.getElementById('redditStocks');
      table.innerHTML = '<tr><th>Ticker</th><th>Comments</th><th>Sentiment</th></tr>' +
        data.slice(0, 5).map(stock => `
          <tr>
            <td><a href="https://finance.yahoo.com/quote/${stock.ticker}" target="_blank">${stock.ticker}</a></td>
            <td>${stock.no_of_comments}</td>
            <td>${stock.sentiment} ${stock.sentiment === 'Bullish' ? '📈' : '📉'}</td>
          </tr>
        `).join('');
    });
  