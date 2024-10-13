// Sample stock data
const stocks = [
  {
    ticker: "AAPL",
    price: "$120.00",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKbVja036CLC6tlqDn6YaAf163E4CiKyADvg&s",
  },
  {
    ticker: "MSFT",
    price: "$250.00",
    imageUrl: "https://g.foolcdn.com/art/companylogos/square/msft.png",
  },
  {
    ticker: "GOOG",
    price: "$800.00",
    imageUrl:
      "https://play-lh.googleusercontent.com/1-hPxafOxdYpYZEOKzNIkSP43HXCNftVJVttoo4ucl7rsMASXW3Xr6GlXURCubE1tA=w3840-h2160-rw",
  },
  {
    ticker: "AMZN",
    price: "$820.21",
    imageUrl:
      "https://m.media-amazon.com/images/G/01/gc/designs/livepreview/amazon_dkblue_noto_email_v2016_us-main._CB468775337_.png",
  },
];

export default function StockList({ onStockClick }) {
  return (
    <ul
      role="list"
      className="divide-y divide-gray-200 bg-white shadow-md rounded-md"
    >
      {stocks.map((stock) => (
        <li
          key={stock.ticker}
          className="flex justify-between items-center gap-x-4 py-4 px-6 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
          onClick={() => onStockClick(stock.ticker)}
        >
          <div className="flex items-center gap-x-4">
            <img
              alt={`${stock.ticker} logo`}
              src={stock.imageUrl}
              className="h-12 w-12 rounded-full bg-gray-100 shadow-md"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-lg text-gray-800">
                {stock.ticker}
              </span>
              <p className="text-sm text-gray-600">{stock.price}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
