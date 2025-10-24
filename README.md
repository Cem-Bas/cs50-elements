# CS50 Elements
#### Video Demo:  <URL HERE>
#### Description:

CS50 Elements is a powerful Chrome extension for inspecting and analyzing webpage elements. This extension provides developers, testers, and web enthusiasts with a comprehensive tool to extract detailed information about any element on a webpage, including XPath selectors, CSS selectors, computed styles, attributes, and more. Built as my final project for CS50, it demonstrates modern Chrome extension development using Manifest V3, featuring a clean light-themed interface that provides instant feedback and precise element selection capabilities.

---

<p align="center">
  <img src="https://img.shields.io/badge/Version-1.1.0-blue" alt="Version">
  <img src="https://img.shields.io/badge/Chrome-88%2B-green" alt="Chrome">
  <img src="https://img.shields.io/badge/Manifest-V3-orange" alt="Manifest">
  <img src="https://img.shields.io/badge/License-MIT-lightgrey" alt="License">
</p>

## 🚀 Quick Start

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Cem-Bas/cs50-elements.git
   cd cs50-elements
   ```

2. **Load in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable **Developer mode** (top right toggle)
   - Click **Load unpacked**
   - Select the `cs50-elements` folder

3. **Pin the Extension**
   - Click the puzzle piece icon (🧩) in Chrome toolbar
   - Find "CS50 Elements"
   - Click the pin icon (📌)

## ✨ Features

### Core Functionality
- 🎯 **Visual Element Selection** - Click to select any element with hover highlighting
- 📍 **XPath Generation** - Get precise XPath for any selected element
- 🎨 **CSS Selector** - Obtain optimized CSS selectors
- 📊 **Computed Styles** - View all CSS properties and values
- 📋 **Attributes** - See all HTML attributes
- 📏 **Dimensions & Position** - Exact pixel dimensions and position
- 📝 **Text Content** - View element text content
- 📋 **Copy Support** - One-click copy for selectors
- ☀️ **Light Theme UI** - Clean, professional interface with excellent readability

### Technical Specifications
- **Manifest Version**: 3 (latest)
- **Chrome Required**: 88+
- **Size**: < 20 KB (lightweight)
- **Performance**: Instant response time
- **Privacy**: Works completely offline, no data collection
- **Permissions**: activeTab only (minimal permissions)

## 📖 How to Use

### Basic Usage

1. **Start Inspection**
   - Click the CS50 Elements icon in toolbar
   - Click "Start Scanning" button
   - Popup stays open for immediate results

2. **Select Elements**
   - Hover over any element (blue highlight appears)
   - Click to select and inspect
   - Element info appears instantly in popup

3. **View Information**
   - **Inspector Tab**: Element details, selectors, styles
   - **About Tab**: Extension info and credits

4. **Copy Selectors**
   - Click copy button (📋) next to XPath or CSS selector
   - Button turns blue with checkmark (✓) when copied

5. **Exit Selection**
   - Press `Escape` key, or
   - Click "Stop Scanning" button

### Understanding the Information

| Field | Description |
|-------|-------------|
| **Element** | HTML tag name with ID and classes |
| **XPath** | Full XPath selector for precise element location |
| **CSS Selector** | Optimized CSS selector for styling/jQuery |
| **Dimensions** | Width × Height in pixels |
| **Position** | Top and Left position on page |
| **Computed Styles** | All active CSS properties |
| **Attributes** | All HTML attributes |
| **Text Content** | Text inside the element (max 500 chars) |

## 💡 Tips & Best Practices

### Quick Selection
- Start scanning → Click element → View info
- All in under 3 clicks!

### Keyboard Shortcuts
- `Escape` - Cancel element selection

### Common Use Cases
- **Web Scraping** - Generate accurate selectors
- **Debugging** - Inspect CSS issues
- **Learning** - Understand HTML structure
- **Testing** - Get selectors for automation

### Pro Tips
- Use XPath for precise element location
- Use CSS selectors for styling or jQuery
- Check computed styles to debug CSS issues
- Clear button resets the inspector

## 🛠️ Development

### File Structure
```
cs50-elements/
├── manifest.json          # Extension configuration
├── popup.html            # Popup interface
├── popup.css             # Popup styling
├── popup.js              # Popup logic
├── content.js            # Content script for selection
├── content-styles.css    # Element highlighting styles
├── background.js         # Background service worker
├── icons/               # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md            # This file
```

### Modifying the Extension

1. Make changes to source files
2. Go to `chrome://extensions/`
3. Click refresh icon on CS50 Elements card
4. Test your changes

### Building for Distribution

**Option 1: ZIP Package**
```bash
zip -r cs50-elements.zip . -x "*.git*" "*.md" "test-*"
```

**Option 2: Chrome Web Store**
1. Create developer account ($5 one-time fee)
2. Upload ZIP file
3. Add store listing details
4. Submit for review

## 🔧 Troubleshooting

### Extension Not Working?
- Refresh the webpage after installation
- Ensure Developer Mode is enabled
- Check Chrome version (88+ required)
- Reload extension from `chrome://extensions/`

### Can't Select Elements?
- Won't work on `chrome://`, `edge://`, or `chrome-extension://` pages
- Some sites may block extensions
- Try refreshing the page
- Check for iframe protection

### Connection Errors?
- These are usually from the website's own scripts, not the extension
- Test on simple sites like `example.com` to verify functionality

## 📋 Testing Checklist

### File Validation ✅
- [x] manifest.json - Valid JSON format
- [x] All JavaScript files present
- [x] All CSS files present
- [x] All icon files present (16x16, 48x48, 128x128)

### Feature Testing ✅
- [x] Extension loads without errors
- [x] Popup opens when clicked
- [x] "Start Scanning" activates selection
- [x] Elements highlight on hover
- [x] Click captures element data
- [x] XPath and CSS selectors accurate
- [x] Copy buttons work correctly
- [x] Escape key cancels selection
- [x] About tab displays properly

## 🔒 Privacy & Security

- **No Data Collection** - Works entirely offline
- **No External Requests** - No server communication
- **Minimal Permissions** - Only activeTab permission
- **No Tracking** - No analytics or user tracking
- **Open Source** - Full code transparency

## 📊 Version History

- **v1.1.0** (October 24, 2024) - Improved UX
  - Popup minimizes when scanning starts
  - Popup reopens automatically when element is selected
  - Fixed all connection errors
  - Better error handling
  - Consolidated documentation

- **v1.0.0** (October 24, 2024) - Initial release
  - Core element inspection functionality
  - XPath and CSS selector generation
  - Computed styles extraction
  - Dark theme UI
  - Dynamic script injection
  - Background service worker for communication

## 🎓 About

**Developed by**: [cem-bas](https://github.com/cem-bas)
**Built with**: JavaScript, Chrome Extension API (Manifest V3)
**AI Assistant**: [Claude AI](https://claude.ai) by Anthropic
**Purpose**: CS50 Final Project

Made with ❤️ for CS50

## 📚 Resources

- **Repository**: [github.com/Cem-Bas/cs50-elements](https://github.com/Cem-Bas/cs50-elements)
- **Issues**: [Report bugs or request features](https://github.com/Cem-Bas/cs50-elements/issues)
- **Chrome Extensions Docs**: [developer.chrome.com](https://developer.chrome.com/docs/extensions/)

## 📜 License

This project is open source and available for educational purposes.

---

**Enjoy using CS50 Elements!** 🎉 The extension provides a powerful, user-friendly interface for web element inspection, perfect for web development, debugging, and learning HTML/CSS structure.