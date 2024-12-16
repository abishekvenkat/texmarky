# texmarky

A modern web application for seamless conversion between Markdown, YAML, and LaTeX formats. All processing happens directly in your browser, ensuring your data remains private and secure.

![texmarky](/texmarky-screen.png)

## features

- **real-time conversion** between markdown, yaml, and latex formats
- **browser-based processing** with no server-side storage
- **file upload support** for easy document importing
- **syntax highlighting** for better readability
- **error handling** with clear feedback
- **responsive design** that works on all devices
- **copy to clipboard** functionality

## getting started

### installation

1. clone the repository:
```bash
git clone https://github.com/abishekvenkat/texmarky.git
cd texmarky
```

2. install dependencies:
```bash
npm install
```

3. start the development server:
```bash
npm run dev
```

4. open your browser and visit `http://localhost:7134`

## usage

1. select your source format (markdown, yaml, or latex)
2. select your target format for conversion
3. either:
   - type or paste your content in the input box
   - upload a file using the upload button
4. view the converted output in real-time
5. copy the converted text using the copy button

## supported conversions

- markdown → yaml
- markdown → latex
- yaml → markdown
- yaml → latex
- latex → markdown
- latex → yaml

### project structure

```
texmarky/
├── src/
│   ├── components/         # react components
│   ├── utils/             # utility functions
│   │   └── converters/    # format conversion logic
│   ├── types/             # typescript type definitions
│   ├── App.tsx           # main application component
│   └── main.tsx          # application entry point
├── public/               # static assets
└── package.json         # project configuration
```

## license

this project is licensed under the MIT License - see the LICENSE file for details.

## privacy

no data is stored with us. all processing happens on your browser.

---

made with ❤️