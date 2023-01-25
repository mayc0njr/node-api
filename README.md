# node-api
test API using nodejs and typescript

A Simple server, that builds a PDF from an EJS template with a mocked json.

server is built with express, rendering pdf with puppeteer and merging pages with PDF-LIB
lint/prettier included, paths solved with tsconfig-paths (and solved on build with tsc-alias)

# Run
## Development
Run local version with

`npm run dev`

## Build
Generates a bundle with
`npm run build`