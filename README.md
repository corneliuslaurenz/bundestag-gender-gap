# Exploring through gender data of the German Bundestag

This repository is part of the thesis "Frauen im Deutschen Bundestag von 1949 bis heute: Entwicklung einer Webanwendung zur Visualisierung einer NLP-Analyse parlamentarischer Reden in Bezug auf Geschlechtergleichstellung" and was provided at the Hochschule Düsseldorf University of Applied Science in May 2025 by Cornelius Laurenz. It contains design and code for the corresponding web application. The focus of the project is to point out, that women are still underrepresentated in the german parliament.

## Data basis

The data basis relies on extracted data provided by Ana Calotescu-Baluteanu and used for a nlp-analysis of the parlamentary speeches in the German Bundestag from 1949 to 2023:

- https://zenodo.org/records/10895276
- https://github.com/Ana287/nlp-bundestag-speeches

## Content

### Product design

- productDesign/screenDesignsBtgg.pdf:
  - Screen designs
- productDesign/wireFramesBtgg.pdf
  - Wire frames

### Source code

- src/00LandingPage, src/01Overview, src/02Speeches, src/03Topics:
  - Main pages of the application
- src/InformationSections:
  - Pages for side informations
- src/common:
  - Components, data, hooks, constants, utils

## Main libraries

- [Data-Diven Documents (D3)](https://github.com/d3/d3):
  - Used for visualization an diagrams
- [GreenSock Animation Platform (GSAP)](https://github.com/greensock/GSAP):
  - Used for animations
- [Material UI (MUI)](https://github.com/mui/material-ui):
  - Used for styling
