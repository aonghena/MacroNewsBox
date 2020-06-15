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
            },{
              label: "Edit",
              submenu: [
                  { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
                  { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
                  { type: "separator" },
                  { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
                  { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
                  { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
                  { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
              ]}
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
  //win.setIcon("./assets/news.ico");
}


app.whenReady().then(createWindow)
