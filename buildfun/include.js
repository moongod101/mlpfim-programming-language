var path = require("path"),
    fs = require("fs")
module.exports = {

    include: function (code,keyword,line) {
        var sourcefilePath = path.join( process.cwd() + "/" + code.split(keyword)[1].trim().split("\"")[1] );
        try{

            var newCode = fs.readFileSync(sourcefilePath).toString();
            newCode = newCode.split(";");

            for(var i = 0; i < newCode.length - 1; i++){
                newCode[i] = newCode[i].trim();
                require("../interperter").runCode(newCode[i]);
            }
            require("../interperter").main(line);

        }catch (e){
            if(e.message.includes("no such file")){
                require("../interperter").echoError("Can't not find the file to be including: " + code.split(keyword)[1].trim(), line);

            }
        }
    }

}