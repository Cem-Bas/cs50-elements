# CS50 Elements - Chrome Extension

A powerful Chrome extension for inspecting and analyzing webpage elements. Get detailed information about any element including XPath, CSS selectors, computed styles, and more.

## Features

- 🎯 **Visual Element Selection**: Click to select any element on the page with hover highlighting
- 📍 **XPath Generation**: Get the precise XPath for any selected element
- 🎨 **CSS Selector**: Obtain optimized CSS selectors for your elements
- 📊 **Computed Styles**: View all computed CSS properties and values
- 📋 **Attributes**: See all HTML attributes of the selected element
- 📏 **Dimensions & Position**: Get exact pixel dimensions and position
- 📝 **Text Content**: View the text content of elements
- 📋 **Copy Support**: One-click copy for XPath and CSS selectors
- 🌙 **Developer-Friendly UI**: Dark theme interface similar to browser DevTools

## Installation

1. **Generate Icons**:
   - Open `icon-generator.html` in your browser
   - Download each icon and save them in the `icons/` folder as:
     - `icon16.png`
     - `icon48.png`
     - `icon128.png`

2. **Load the Extension in Chrome**:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the project folder containing `manifest.json`

3. **Pin the Extension**:
   - Click the puzzle piece icon in Chrome toolbar
   - Find "CS50 Elements" and click the pin icon

## Usage

1. Click the CS50 Elements icon in your Chrome toolbar
2. Click "Start Scanning" button
3. Hover over elements on the webpage to highlight them
4. Click on any element to inspect it
5. View detailed information in the popup window:
   - Element tag, ID, and classes
   - XPath and CSS selector (with copy buttons)
   - Dimensions and position
   - Computed styles
   - HTML attributes
   - Text content

Press `Escape` key to cancel selection mode.

## File Structure

```
project/
├── manifest.json          # Extension configuration
├── popup.html            # Popup interface
├── popup.css             # Popup styling
├── popup.js              # Popup logic
├── content.js            # Content script for element selection
├── content-styles.css    # Styles for element highlighting
├── icon-generator.html   # Tool to generate icons
├── icons/               # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md            # This file
```

## Development

To modify the extension:

1. Make your changes to the source files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the CS50 Elements card
4. Test your changes

## About

Developed by [cem.bas](https://github.com/cem.bas)

Made with ❤️ for CS50

## License

This project is open source and available for educational purposes.