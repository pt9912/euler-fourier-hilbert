FROM node:20-alpine

WORKDIR /app

# mathjax-full ist das offizielle Node.js-Paket aus
# https://github.com/mathjax/MathJax-src und damit dieselbe Engine, die
# GitHub fuer das Rendering nutzt:
# https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/writing-mathematical-expressions
#
# Hinweis: GitHub deaktiviert zusaetzlich einige Makros (z.B. \operatorname)
# per eigener Allow-Liste. Diese GitHub-spezifischen Restriktionen pflegen
# wir explizit im Validator.

RUN npm install --no-audit --no-fund mathjax-full@3.2.0

COPY docs-check.js /app/docs-check.js

WORKDIR /work
ENTRYPOINT ["node", "/app/docs-check.js"]
