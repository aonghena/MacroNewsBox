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

  const template = [
    {
      label: 'Sources',
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
              }
            }
            ]   
    }
  ]
  
  if (process.platform === 'darwin') {
    const name = app.getName()
    template.unshift({
      label: name,
      submenu: [
        {
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          role: 'services',
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          role: 'hide'
        },
        {
          role: 'hideothers'
        },
        {
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          role: 'quit'
        }
      ]
    })
  }
  
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu); 

  // and load the index.html of the app.
  win.loadFile('index.html')
  //win.webContents.openDevTools();

}


app.whenReady().then(createWindow)
