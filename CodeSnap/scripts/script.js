CodeMirror(document.querySelector('#my-div'), {
    lineNumbers: false,
    scrollbarStyle: null,
    tabSize: 2,
    value: 'console.log("Hello, JavaScript");',
    theme: 'monokai'
});

const ele = document.getElementById('my-div');
const btn = document.getElementById('snapbtn');
btn.addEventListener('click', ()=>{
domtoimage.toPng(ele)
    .then(function (dataUrl) {
        const img = document.createElement('a');
        img.href = dataUrl;
        img.download = 'codeSnap.png';
        document.body.appendChild(img);
        img.click();
        document.body.removeChild(img);
    })
    .catch(function (err) {
        console.error(err);
    });
});