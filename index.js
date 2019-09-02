const GoogleSpreadsheet= require('google-spreadsheet');
const {promisify} = require('util');

const cred = require('./client_secret.json')

async function accessSpreadsheet(){
    const doc = new GoogleSpreadsheet('1gGvfuvqMRBswyh8hAx4ZX992uZv8I3livoIaAtFOZRc');
    await promisify(doc.useServiceAccountAuth)(cred);
    const info= await promisify(doc.getInfo)();
    const sheet = info.worksheets[0];
    // console.log(sheet);
    // console.log(`Title : ${sheet.title}, Rows: ${sheet.rowCount}`);
    const rows= await promisify(sheet.getRows)({
        offset:1
    });
    // console.log(rows);

    rows.forEach(row => {
        printUser(row);       
    });

    const writeRow={"username":"abhind_dn","name":"Abhinandan", "email":"abhinandan@gmail.com"}


    await promisify(sheet.addRow)(writeRow);
}


function printUser(userData){
    console.log(userData);
    console.log(`Username: ${userData.username}`);
    console.log(`Name: ${userData.name}`);
    console.log(`Email: ${userData.email}`);
    console.log("==============================");
}

accessSpreadsheet();
 