const {app, BrowserWindow,ipcMain} = require('electron')
const _path = require('path')
const os = require('os');
//import dependencies

const userDir = os.homedir()//get user directory

function createWindow (path) {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 1300,
    height: 900,
    autoHideMenuBar: true,
    icon: _path.join(__dirname, '/icon.ico'), 
    webPreferences: {
      devTools: false,
      preload: _path.resolve(__dirname, './preload.js'),//preload.js ,absolute path
    }
  })//config windows

    // and load the html file of the app.
    win.loadFile(path)
}//create window

function writeMistake(data){
    if(!ifExistWrongFile()){
      if(!ifExistDir()){
        createWrongFile()
      }else{
        createWrongFileWithoutCtreateDir()
      }
      writeMistake(data)
    }
    var json = readJSON()
    if(data.word != undefined){
      if(ifExist('words',data.word)){
        var content = data.word
        var meaning = data.meaning
        json.words[`${content}`].time += 1
        writeJSON(json)
      }
      else{
        var content = data.word
        var meaning = data.meaning
        json.words[`${content}`]={word: content, meaning: meaning, time: 1}
        writeJSON(json)
    }
      }
      else if(data.phrase != undefined){
        if(ifExist('phrases',data.phrase)){
          var content = data.phrase
          var meaning = data.meaning
          json.phrases[`${content}`].time += 1
          writeJSON(json)
        }
        else{
          var content = data.phrase
          var meaning = data.meaning
          json.phrases[`${content}`]={phrase: content,meaning: meaning,time:1}
          writeJSON(json)
        }
      }
      else if(data.clause != undefined){
        if(ifExist('clauses',data.clause)){
          var content = data.clause
          var meaning = data.meaning
          json.clauses[`${content}`].time += 1
          writeJSON(json)
        }
        else{
          var content = data.clause
          var meaning = data.meaning
          json.clauses[`${content}`]={clause: content,meaning: meaning,time:1}
          writeJSON(json)
        }
      }else{
        return false
      }
}//write mistake to wrong.json file

function createWrongFile(){
  var fs = require('fs')
  var init_data = {
    words:{

    },
    phrases:{
      
    },
    clauses:{
      
    }
  }
  fs.mkdirSync(_path.resolve(userDir,'./english_test'))
  fs.writeFileSync(getWrongURL(),JSON.stringify(init_data))
}//create wrong.json file

function createWrongFileWithoutCtreateDir(){
  var fs = require('fs')
  var init_data = {
    words:{

    },
    phrases:{
      
    },
    clauses:{
      
    }
  }
  fs.writeFileSync(getWrongURL(),JSON.stringify(init_data))
}//create wrong.json file

function ifExistWrongFile(){
  var fs = require('fs')
  console.log("checking wrong.json file existence...")
  return fs.existsSync(getWrongURL())
}//check the existence of wrong.json file

function ifExist(type, content){
  var fs = require('fs')
  var data = JSON.parse(fs.readFileSync(getWrongURL()))
  console.log("checking \""+content+"\" existence...")
  if(data[`${type}`][`${content}`] != undefined){
    return true
  }else{
    return false
  }
}//check the existence of a content in wrong.json file

function writeJSON(data){
  var fs = require('fs')
  fs.writeFileSync(getWrongURL(),JSON.stringify(data))
}//write data to wrong.json file

function readJSON(){
  var fs = require('fs')
  return JSON.parse(fs.readFileSync(getWrongURL()))
}//read data from wrong.json file

function getWrongURL(){
  return _path.resolve(userDir,'./english_test/wrong.json')
}//get the absolute path of wrong.json file

function ifExistDir(){
  var fs = require('fs')
  console.log("checking english_test folder existence...")
  return fs.existsSync(_path.resolve(userDir,'./english_test'))
}//check the existence of english_test folder

function readMistake(){
  var fs = require('fs')
  if(!ifExistWrongFile()){
    if(!ifExistDir()){
      createWrongFile()
    }else{
      createWrongFileWithoutCtreateDir()
    }
    return readMistake()
  }else{
    return JSON.parse(fs.readFileSync(getWrongURL()).toString())
  }
}//read data from wrong.json file

app.on("ready", _ => {
    createWindow("./pages/index.html")
    //application is ready
})//main thread start here

ipcMain.on('create-window',(_,data)=>{
  createWindow(data)
})//createChlidWindow

ipcMain.on('write-mistake',(_, data)=>{
  writeMistake(data)
})//call the function writeMistake()

ipcMain.handle('read-mistake',readMistake)
//call the function readMistake()

app.on("window-all-closed", _ => {
  if (process.platform !== "darwin") {
    app.quit()
}})//for the macOS