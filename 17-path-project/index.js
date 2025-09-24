const express = require('express');
const app = express();

const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => {
    const filePath = '/users/yahubaba/docs/report.pdf'
    console.log("BaseName: " + path.basename(filePath))
    // console.log("DirName: " + path.dirname(filePath))
    // const parsed = path.parse(filePath)
     // return object     {root: '/', dir: '/users/yahubaba/docs',base: 'report.pdf', ext: '.pdf', name: 'report'}

    // console.log(parsed)
    
    const fullPath = path.join(__dirname, 'public', 'images', 'avator.jpg')
    console.log(fullPath) //BaseName: report.pdf F:\Node series\17-path-project\public\images\avator.jpg

    // const absolutePath = path.resolve('public', 'image.jpg')
    // console.log(absolutePath)
    res.send("Path Module")

})




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
