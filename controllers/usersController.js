const axios = require('axios');

const getPortfolio = async (req, res) => {
  try {
    const {portfolio: portfolioList, balance} = req.user;
    let totalPortfolioPrice = 0;

    const symbols = portfolioList.map(portfolioItem => portfolioItem.ticker.toUpperCase());

    if (symbols.length > 0) {
      const symbolsString = symbols.join();

      if (process.env.NODE_ENV === 'production') {
        var apiUrl = `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${symbolsString}&types=quote&token=${process.env.iexToken}`;
      } else {
        var apiUrl = `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${symbolsString}&types=quote&token=${process.env.iexSandboxToken}`;
      }

      const {data} = await axios.get(apiUrl);

      portfolioList.forEach(portfolioItem => {
        const {latestPrice, open: openPrice} = data[portfolioItem.ticker].quote;
        portfolioItem.totalPrice = latestPrice * portfolioItem.quantity;
        totalPortfolioPrice += portfolioItem.totalPrice;

        if (latestPrice < openPrice) {
          portfolioItem.performance = 'less';
        } else if (latestPrice > openPrice) {
          portfolioItem.performance = 'greater';
        } else {
          portfolioItem.performance = 'equal';
        }
      });
    }

    res.send({portfolioList, balance, totalPortfolioPrice});
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
    getPortfolio,
}
