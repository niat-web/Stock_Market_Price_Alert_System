```markdown
# Stock_Market_Price_Alert_System

## Objective
This project implements a web-based stock market price alert system using JavaScript, HTML, and CSS. The application allows users to set up price alerts for specific stock symbols and displays real-time stock data fetched from the Alpha Vantage API. Features include a dark mode toggle for improved user experience, form validation to ensure accurate alert settings, and dynamic display of stock information in a table format. The application leverages DOM manipulation, event listeners, asynchronous data fetching, and local storage for persistent theme preferences.

## Output
<iframe src="https://niat-web.github.io/Stock_Market_Price_Alert_System/" height="1000" width="300" title="Stock_Market_Price_Alert_System"></iframe>

## Project Requirements
**Technologies:** JavaScript, HTML, CSS, Alpha Vantage API

## Features to Implement
- Dark mode toggle using local storage to persist theme preference.
- Form validation for stock symbol and price inputs.
- Display of success notification when an alert is set.

## UI Enhancements
- Improve the visual appeal of the stock data table with better styling.
- Add a loading indicator during API calls.

## Project Tasks & Expected Outcomes
| Task | Expected Outcome |
|------|------------------|
| Implement dark mode functionality | User can switch between light and dark themes, and the preference is saved using local storage. |
| Implement form validation | The form validates stock symbol (non-empty) and price (non-empty, numeric) inputs, displaying error messages for invalid input. |
| Fetch and display stock data | Stock data (current price, high, low) is fetched from the Alpha Vantage API and displayed in the UI, along with a table of recent data. |
| Implement price alert functionality | Display a notification when a price alert is set for the selected stock. |

## JavaScript Concepts
| Concept | Implementation |
|---------|----------------|
| DOM Manipulation | Used to dynamically update the content of the HTML elements with fetched data and user input. Examples include setting text content, adding/removing classes, and creating table elements. |
| Event Listeners | Used to handle user interactions such as form submissions, button clicks, and select changes. The `addEventListener` method is used to attach event handlers to specific elements. |
| Asynchronous JavaScript | Used to fetch stock data from the Alpha Vantage API without blocking the main thread. The `async/await` syntax is used to handle promises returned by the `fetch` API. |
| Local Storage | Used to persist the user's dark mode preference across sessions. The `localStorage.setItem` and `localStorage.getItem` methods are used to store and retrieve the theme setting. |
| Arrays and Objects | Used to store and manipulate stock data. Arrays are used to store lists of stocks, and objects are used to represent individual stock details. |

## API Details
| API | Endpoint | Description |
|-----|----------|-------------|
| Alpha Vantage | `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}` | Fetches intraday stock data for a given symbol at 5-minute intervals. |
```