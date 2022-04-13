# ReactSJ + Hooks + Redux - Build an app like Trello

## Requirement
* **nodejs >= v14.7.0**
* **npm >= v6.4.7**
* **yarn >= v1.19.1**

Clone project and run test.

```
$ git clone https://github.com/nvchau/meowlo
$ cd meowlo
$ yarn | npm install
$ yarn | npm start
```

# Description
## Eslint
#### Libraries
* eslint
* eslint-plugin-react
* eslint-plugin-react-hooks
#### Run
* Run: npm run eslint
## Grap and Drop function
#### Libraries
* Use `react-smooth-dnd` (the documentation of this library is quite limited and not as clear as the one below) (code demo: https://github.com/kutlugsahin/smooth-dnd-demo/blob/master/src/demo/pages/cards.js)
* Or `react-beautiful-dnd` (but it still has issue 131 from 2017 until now, still unresolved)
* Specific error of `react-beautiful-dnd`: cannot drag cards back and forth between columns that are far apart
* Link: https://www.youtube.com/watch?v=AvgP3c-ayt8&list=PLP6tw4Zpj-RKdGMqhYpfdl94cd4fu-RFg&index=9 (Time: 01:20:40)
## UI
* `react-bootstrap` npm | import Sass to src/App.scss
* `bootstrap` npm
* can find colors library: flatuicolors