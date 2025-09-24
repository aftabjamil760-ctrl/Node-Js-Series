const express = require('express');
const app = express();
const fs = require('fs')


//write file
app.get('/write-file', (req, res) => {
    fs.writeFile('./public/output.txt', 'This is a test message.', (err)=>{
        if (err) {
            return res.status(500).send("failed to write file")
        }
        res.send('file written successfully')
    })
})
//read file
app.get('/read-file', (req, res) => {
    fs.readFile('./public/output.txt', (err, data)=>{
        if (err) {
            return res.status(500).send("file not found")
        }
        res.setHeader('Content-Type', 'text/plain')
        res.send(data)
    })
})
//append file
app.get('/append-file', (req, res) => {
    fs.appendFile('./public/output.txt', '\nnew line appended.', (err)=>{
        if (err) {
            return res.status(500).send("failed to append file.")
        }
        res.send("content appended.")
    })
})
//delete file
app.get('/delete-file', (req, res) => {
    fs.unlink('./public/output.txt',(err)=>{
        if (err) {
            return res.status(500).send("failed to delete file.")
        }
        res.send("file deleted successfully.")
    })
})

//read a folder/ directory 
app.get('/read-folder', (req, res) => {
    fs.readdir('./public',(err, files)=>{
        if (err) {
            console.log(err)
            return;
        }
        //delete each each file
        files.forEach(file => {
            console.log(file)
        })
        console.log(files)
        res.send("file deleted successfully.")
    })
})

//file rename
app.get('/rename-file', (req, res) => {
    fs.rename('./public/output.txt', './public/new-output.txt',(err)=>{
        if (err) {
            return res.status(500).send("failed to rename file.")
        }
        res.send("file renamed successfully.")
    })
})
//stream Data
app.get('/stream-text', (req, res) => {
    const fileStream = fs.createReadStream('./public/new-output.txt')
    fileStream.on('open', () => {
       fileStream.pipe(res)
    })
    fileStream.on('error', () => {
       res.status(500).send("file not found or error reading file.")
   })
})
//create folder
app.get('/create-folder', (req, res) => {
    fs.mkdir('./public/myFolder',(err) => {
        if (err) {
            return res.status(500).send("error creating folder.")
        }
        res.send("folder created successfully.")
    })
})
//rename folder
app.get('/rename-folder', (req, res) => {
    fs.rename('./public/myFolder','./public/renamedFolder',(err) => {
        if (err) {
            return res.status(500).send("error enaming folder.", err)
        }
        })
        res.send("folder renamed successfully.")
})
    //delete folder
app.get('/delete-folder', (req, res) => {
    fs.rmdir('./public/renamedFolder',(err) => {
        if (err) {
            return res.status(500).send("error deleting folder.", err)
        }
        })
        res.send("folder deleted successfully.")
})
app.get('/read-pdf', (req, res) => {
    fs.readFile('./public/data.pdf',(err, data) => {
        if (err) {
            return res.status(500).send("pdf not found.")
        }
        res.setHeader('Content-Type', 'application/pdf')
        res.send(data)
    })
})

//read json file
    app.get('/read-json', (req, res) => {
    fs.readFile('./public/data.json',(err, data) => {
        if (err) {
            return res.status(500).send("json not found.", err)
        }
          res.setHeader('Content-Type', 'application/json')
        res.send(data)
    })
      
    })
//write json file
app.get('/write-json', (req, res) => {
    const filePath = './public/data.json'
    const data = {name: 'aftab jamil', email: "aftabhamil1056@gmail.com", age: 24}
    fs.writeFile(filePath, JSON.stringify(data),(err, data) => {
        if (err) {
            return res.status(500).send("failed to write json file.", err)
        }
    })
        
        res.send('json file return successfully')
})
//writ json file and keep existing data: 1.json file read 2.convert to js object 3.put in array and push new data
    app.get('/append-json', (req, res) => {
    const filePath = './public/data.json'
    const newData = {name: 'ali hassan', email: "alihassan222@gmail.com", age: 23}
    fs.readFile(filePath, (err, data) => {
        if (err) {
            return res.status(500).send("failed to read json file.", err)
        }
        let jsonData;
        jsonData = JSON.parse(data)
        if (!Array.isArray(jsonData)) {
            jsonData = [jsonData]
        }
        jsonData.push(newData)
         fs.writeFile(filePath, JSON.stringify(jsonData),(err, data) => {
        if (err) {
            return res.status(500).send("failed to write json file.", err)
        }
    })
        
        res.send('json file appended successfully')
})
    })
       //read img file
    app.get('/read-image', (req, res) => {
    fs.readFile('./public/image.jpg',(err, data) => {
        if (err) {
            return res.status(500).send("img not found.", err)
        }
          res.setHeader('Content-Type', 'image/jpg')
        res.send(data)
    })
      
    })
      //read vedio file
    app.get('/read-video', (req, res) => {
    fs.readFile('./public/earth.mp4',(err, data) => {
        if (err) {
            return res.status(500).send("vedio not found.", err)
        }
          res.setHeader('Content-Type', 'video/mp4')
        res.send(data)
    })
      
    })
         //getting info for file
    app.get('/file-info', (req, res) => {
    fs.stat('./public/earth.mp4',(err, stats) => {
        if (err) {
            return res.status(500).send("file not found.", err)
        }
        res.send(stats) //(stats.size + 'byte')
        console.log("File : " + stats.isFile)
        console.log("Folder: " + stats.isDirectory)
    })
      
    })
           //check if file exist
    app.get('/file-exists', (req, res) => {
    fs.access('./public/earth.mp4',(err) => {
        if (err) {
            return res.status(500).send("file does not found.", err)
        }
        res.send("file exists") //(stats.size + 'byte')
        
    })
      
    })
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
