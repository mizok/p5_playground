---
title: 專案模板project_template操作說明
date: 
author: Mizok
tags: 
---

###### tags:`Neux新人百科`,`切版相關`,`新人須知`
# 專案模板git template repo操作說明

**GIT repo:**(需要請ＲＤ主管開啟權限才可以編輯檢視)
https://github.com/neuxtitanteng/project_template 

## **介紹:**
project_template 是一個公司在2020年5月開始使用的專案模板git repo，使用的目的是為了要統一前端的開發流程，還有一致化資料夾結構與命名。


## 如何安裝與啟動
project_template有使用webpack(4.0)來做開發，在使用前，請先確定在自己主機有全域安裝下列NPM套件：**webpack**與**webpack-dev-server**，如果沒有可以用下面的指令做安裝（電腦要先有安裝node.js 才可以跑npm安裝指令，如果沒有使用過npm的經驗，可以參考[這篇](https://github.com/nodejs-tw/nodejs-wiki-book/blob/master/zh-tw/node_npm.rst)）

```
npm install -g webpack
```
```
npm install webpack-dev-server
```
安裝完畢之後，可以在自己的電腦上用GIT clone 去下載專案repo，（如果沒有使用過GIT的經驗，可以參考[這篇](https://backlog.com/git-tutorial/tw/intro/intro1_1.html)），下載完畢之後用VSCODE打開repo資料夾，然後開啟VSCODE終端機，輸入下列指令安裝repo需求程序套件包:
```
npm install
```
待repo需求程序套件包安裝完畢，就可以開始啟動專案內置虛擬伺服器，請輸入下列指令：
```
npm run dev
```
這樣project_template內部的虛擬伺服器就會開啟你的預設瀏覽器並進入localhost:8080頁面，這樣就可以看到專案內index.html實際的預覽狀況。

## 開發過程如何使用

### 樣式
project_template預設要使用scss做樣式的編寫，SCSS文件是固定放在scr/scss這個資料夾底下，scr/scss底下會有/core和/project，core是用來放專案共通常常用到的一些mixin與變數用以方便開發中使用，專案專用的scss檔案請放在/project底下

### 共用html模板檔案
有時候有些專案有兩頁以上，內部有需要共用的html區塊(例如header/footer)，這時候可以把header/footer 抽成單獨的html file 然後放到/template這個資料夾底下，然後在需要引入的檔案中用include-html屬性引入html，如下例：
> 記得include-html屬性的寫法是從template資料夾開始下。如果是從src/template/**這樣去下會出現一個問題..就是resolve alias會吃不到template裡面的圖片路徑
```html
<div include-html="template/header.html"></div>

```
### html img 標籤的 src必須使用resolve alias寫法
resolve alias寫法是project_template內部自行定義的圖片路徑寫法，如下例：
```html
<img src="~@img/logo.png">
```
這樣project_template就會在虛擬伺服器執行階段或專案編譯階段自動把"~@img"自動轉譯成dist folder中該圖片資源的實際路徑
### 如何加入網頁的favicon？
請把預設要用來作為專案favicon 的png檔案，存成logo.png這一個檔名然後把檔案放在assets/images/底下, 就可以了。
project_template預設是使用HtmlWebpackPlugin去做 favicon的導入，如果要改動預設的favicon 路徑與檔名，可以在webpack.config.js底下的HtmlWebpackPlugin設定中找到相關資訊

### 我應該要怎麼樣交付由project_template製作出來的專案？

請在vscode開啟目標專案的狀態下，在專案的終端機中輸入：
```
npm run build
```
這樣project_template內的webpack就會把專案輸出成一包dist檔在專案內部，交付的時候就是把/dist這一包檔案做交付即可。

### 關於SCSS部分

project_template 預設是使用@neux/ui-jquery 來作為核心的material design ，這部分會預設作為dependency導入

```
scss
├── README.md
├── abstracts
│   ├── README.md
│   ├── _functions.scss //用來放置專案的function集
│   ├── _mixins.scss    //用來放置專案的mixin集
│   └── _variables.scss //用來放置專案的變數集
├── base
│   ├── README.md
│   ├── _base.scss  //專案本身自定義的reset樣式表，內部會預設include @neux/ui-jquery 的reset mixin
│   └── _helpers.scss //用來放置一些專案內部使用的輔助型class(例如自定義的grid class/clearfix/functional class)
├── components    
│   └── README.md   //用來放置一些可自由拆裝的元件塊class或可以做scss @extend的樣式塊
├── layout
│   ├── README.md  //用來放置一些專案網頁框架相關的樣式（例如頁面padding），或是使用components中的樣式塊時所必須做的客製化設定
│   └── _site.scss  
│   ├── _footer.scss
│   └── _header.scss
├── main.scss //專案的SCSS入口 同時也會導入@neux/ui-jquery，如果有第三方套件樣式導入的需求，請也在這邊開頭做導入
```

