const chalk = require("chalk")
const fs=require('fs')
const yargs=require("yargs")

//console.log(JSON.stringify(yargs.argv))

yargs.command({
    command: "add",
    describe: "to add notes",
    handler: (argv) => {
        let data= {
            title: argv.title,
            body:argv.body
        }
        console.log(chalk.bgGreen.blackBright("Adding a Note..."))
        fs.appendFileSync('notes.txt', JSON.stringify(data))
        fs.appendFileSync('notes.txt',"\n")
        console.log("Title : ", argv.title)
        console.log("Body : ", argv.body)
        console.log(chalk.bgBlue.yellowBright("Note Added Successfully."))
    },
    builder: {
        title: {
            describe: "note title",
            demandOption: true,
            type:'string'
        },
        body: {
            describe: "note body",
            demandOption: true,
            type:'string'
        }
    }
})

yargs.command({
    command: "delete",
    describe: "to delete a note",
    handler: (argv) => {
        let datainbinary = fs.readFileSync('notes.txt')
        let data = datainbinary.toString().split("\n")
        let found = false, note = null;
        for (let i = 0; i < data.length-1; i++){
            note = JSON.parse(data[i])
            if (note.title === argv.title) {
                data.splice(i, 1)
                found = true
                break
            }
        }
        if(found)
        {
            console.log(chalk.bgYellow(chalk.black("Successfully Deleted a Note with Title: ", argv.title)))
            if (data.length > 1) {
                fs.writeFileSync('notes.txt', JSON.stringify(JSON.parse(...data)))
                fs.appendFileSync('notes.txt', "\n")
            }
            else {
                fs.writeFileSync('notes.txt','')
            }
        }
        else
        {
            console.log(chalk.bgRed(chalk.black("No Note Found with Title: ", argv.title)))
        }
    },
    builder: {
        title: {
            describe: "note title to delete a note",
            demandOption: true,
            type:'string'
        }
    }
})

yargs.command({
    command: "list",
    describe: "to list all notes",
    handler: () => {
        let datainbinary = fs.readFileSync('notes.txt')
        let data = datainbinary.toString().split("\n")

        if(data.length>1)
            console.log(chalk.bgYellowBright.green("Listing all Notes"))
        else
        console.log(chalk.bgRed.black("No Notes Written Yet"))
            
        for (let i = 0; i < data.length - 1; i++){
            let note = JSON.parse(data[i])
            console.log(i+1,".  Title: ",chalk.cyan(note.title),"     Body: ",chalk.green(note.body.substring(0,20)+"..."))
        }
       
    }
})

yargs.command({
    command: "find",
    describe: "to find a note",
    handler: (argv) => {
        let datainbinary = fs.readFileSync('notes.txt')
        let data = datainbinary.toString().split("\n")
        let found = false, note = null;
        for (let i = 0; i < data.length - 1; i++){
            note=JSON.parse(data[i])
            if (argv.title === note.title) {
                found = true
                break;
           }
        }
        if(found)
        {
            console.log(chalk.bgGreen(chalk.black("Note Found with Title: ", argv.title)))
            console.log(note.body)
        }
        else
        {
            console.log(chalk.bgRed(chalk.black("No Note Found with Title: ", argv.title)))
        }
        
    },
    builder: {
        title: {
            describe: "note title to find a note",
            demandOption: true,
            type:'string'
        }
    }
})

yargs.parse()