const { app, BrowserWindow, Menu, ipcRenderer} = require('electron')


function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  var menu = Menu.buildFromTemplate([
      {
          label: 'Macro News Box',
          submenu: [
              {label:'Sources', 
              click(){
                let sourceWin = new BrowserWindow({
                  width: 500,
                  height: 300,
                  webPreferences: {
                    nodeIntegration: true
                  }
                })
                sourceWin.loadFile('sourceWin.html');
                sourceWin.on('closed', _ => {
                  win.reload();
                });
              },
            
            },
              {label:'Exit'}
          ]
      }
  ])
  Menu.setApplicationMenu(menu); 

  // and load the index.html of the app.
  win.loadFile('index.html')
}


app.whenReady().then(createWindow)

