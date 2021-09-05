let statute = {
    botFile: undefined,
    parseCode(code) {
        let l = code.length;
        code = code.split('_');
        if (l !== 12 || code.length !== 3) return null;
        return {
            type: code[0],
            date: code[1],
            index: code[2]
        }
    },
    getBot(callback) {
        if (this.botFile) callback(...this.botFile);  // If already downloaded
        getData('/API/statute', 'bot.json', data => {
            this.botFile = JSON.parse(data);
            callback(...this.botFile);
        })
    },
    getAct(inp, callback) {
        // inp can be reference code or path
        this.getBot(data => { 
            let t = this.parseCode(inp);
            let path = '';

            if (t) {
                path = data[inp];
            } else for (cur of data) if (cur.path == inp) path = cur.path;
                    
            getData('/API/statute/', path, (act) => {
                act = JSON.parse(act);
                callback(act);
            })
        });
    }
}