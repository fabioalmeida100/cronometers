const electron = require('electron');
const { Tray, Menu, app } = electron;
const contextMenu = Menu.buildFromTemplate([
    {
        label: 'Fechar',
        click(){
            app.quit();
        }
    }
]);

class ChronoTray extends Tray{
    constructor(iconPath, mainWindow){
        super(iconPath);
        this.mainWindow = mainWindow;
        this.on('click', this.onclik.bind(this));
        this.setToolTip('Cronômetro/Timer');
        this.setContextMenu(contextMenu);
    }

    onclik(event, bounds) {
        const { x, y } = bounds;

        const { width, height } = this.mainWindow.getBounds();


        if (this.mainWindow.isVisible()) {
            this.mainWindow.hide();
        }
        else{
            this.mainWindow.setBounds({
                x: x >= 400 ? (x - Math.floor(width / 2)) : x,
                y: y >= 300 ? (y - height) : y,
                width,
                height
            });
            this.mainWindow.show();
        } 
    }                  
}

module.exports = ChronoTray;