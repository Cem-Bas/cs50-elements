# CS50 Elements - Installation & Usage Guide

## 🚀 Quick Installation

### Method 1: Load Unpacked Extension (Developer Mode)

1. **Download/Clone the Repository**
   ```bash
   git clone https://github.com/Cem-Bas/cs50-elements.git
   cd cs50-elements
   ```

2. **Open Chrome Extensions Page**
   - Open Chrome browser
   - Navigate to `chrome://extensions/`
   - Or click Menu (⋮) → More tools → Extensions

3. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top right corner

4. **Load the Extension**
   - Click "Load unpacked" button
   - Navigate to the `cs50-elements` folder
   - Select the folder and click "Select"

5. **Pin the Extension**
   - Click the puzzle piece icon (🧩) in the Chrome toolbar
   - Find "CS50 Elements"
   - Click the pin icon (📌) to keep it visible

## 📦 Extension is Now Ready to Use!

## 🎯 How to Use CS50 Elements

### Starting Element Inspection

1. **Navigate to Any Website**
   - Go to any webpage you want to inspect

2. **Open CS50 Elements**
   - Click the CS50 Elements icon in your toolbar
   - The popup window will open

3. **Start Scanning**
   - Click the "Start Scanning" button
   - The popup will close automatically
   - Your cursor will change to a crosshair (+)

### Selecting Elements

1. **Hover Over Elements**
   - Move your mouse over any element on the page
   - Elements will be highlighted with a blue overlay

2. **Click to Select**
   - Click on any highlighted element to inspect it
   - The extension popup will reopen with element details

3. **Cancel Selection**
   - Press `Escape` key to exit selection mode
   - Or click the extension icon and click "Stop Scanning"

### Understanding the Information

#### Element Details Tab
- **Element Tag**: HTML tag name (div, p, button, etc.)
- **ID**: Element's ID attribute (if present)
- **Classes**: CSS classes applied to the element
- **XPath**: Full XPath selector for the element
- **CSS Selector**: Optimized CSS selector
- **Dimensions**: Width × Height in pixels
- **Position**: Top and Left position on page
- **Computed Styles**: All active CSS properties
- **Attributes**: All HTML attributes
- **Text Content**: Text inside the element

#### Copy Functionality
- Click the copy button (📋) next to XPath or CSS Selector
- The selector is copied to your clipboard
- Button turns blue with a checkmark (✓) when successful

#### About Tab
- View extension information
- Developer credits
- GitHub link

## 🎨 Features

### Visual Feedback
- **Blue Highlight**: Shows element boundaries on hover
- **Crosshair Cursor**: Indicates selection mode is active
- **Dark Theme**: Easy on the eyes, matches Chrome DevTools

### Data Extraction
- **XPath Generation**: Creates precise element path
- **CSS Selector**: Generates optimized selectors
- **Style Analysis**: Shows all computed CSS values
- **Metadata**: Extracts all element attributes

### Developer Tools
- **One-Click Copy**: Quick selector copying
- **Clear Button**: Reset the inspector
- **Escape Key**: Quick exit from selection mode

## ⚡ Tips & Tricks

1. **Quick Selection**
   - Start scanning → Click element → View info
   - All in under 3 clicks!

2. **Keyboard Shortcuts**
   - `Escape`: Cancel element selection

3. **Best Practices**
   - Use XPath for precise element location
   - Use CSS selectors for styling or jQuery selection
   - Check computed styles to debug CSS issues

4. **Common Use Cases**
   - Web scraping selector generation
   - Debugging CSS issues
   - Learning HTML structure
   - Automated testing selector creation

## 🔧 Troubleshooting

### Extension Not Working?
1. Refresh the webpage after installation
2. Make sure Developer Mode is enabled
3. Check Chrome version (should be 88+)

### Can't Select Elements?
1. Some websites block extensions on certain pages
2. Try refreshing the page
3. Check if the website has frame/iframe protection

### Icons Not Showing?
1. Reload the extension from chrome://extensions/
2. Check that all icon files are in the icons/ folder

## 📋 System Requirements

- **Chrome Version**: 88 or higher
- **Operating System**: Windows, macOS, Linux
- **Permissions**: activeTab (only current tab access)

## 🔒 Privacy & Security

- No data is collected or sent to external servers
- Works entirely offline
- Only accesses the current active tab
- No tracking or analytics

## 📚 Additional Resources

- **GitHub Repository**: [https://github.com/Cem-Bas/cs50-elements](https://github.com/Cem-Bas/cs50-elements)
- **Report Issues**: [GitHub Issues](https://github.com/Cem-Bas/cs50-elements/issues)
- **Chrome Extensions Docs**: [developer.chrome.com](https://developer.chrome.com/docs/extensions/)

## 🎉 Enjoy Using CS50 Elements!

Built with ❤️ for CS50 by cem-bas with assistance from Claude AI