// const apiUrl = "http://localhost:7080";
let link = new PhantasmaLink("Ghost Festival Mint");

function login() {
  link.login(function (success) {
    if (success) {
      console.log(link);
    }
  });
}

function TestPhantasma() {
  let myGhostFestival = JSON.parse(localStorage.getItem("GhostFestival"));
  console.log("myGhostFestival", myGhostFestival);
  // let myAddress = "P2K8uxLqAxA5Szi3K9xoa6rUaouPRRqj9YyAt1CMrfSKt76"; //public addr of dummy wallet genesis, guid
  let myAddress = link.account.address; //public addr of dummy wallet genesis, guid

  let minimumFee = "100000";
  let gaslimit = "100000";

  let sb = new ScriptBuilder();

  let script = sb
    .callContract("gas", "allowgas", [
      myAddress,
      sb.nullAddress(),
      minimumFee,
      gaslimit,
    ])
    .callContract("GFEST", "mintGhost", [
      0,
      25,
      myAddress,
      "GFEST",
      1,
      2,
      "Shadow",
      "Shadow black ghost",
      "http://amazumedia.com/GhostFestival/img/Ghosts/ghost_shadow_black.mp4",
      "info URL is:",
      "Black",
      "OG",
      0,
      0,
      "None",
      "None",
      false,
      "None",
    ])

    //mintGhost(editionId:number, editionMax:number, creator:address, mintTicker:string, numOfNfts:number,
    //royalties: number, name: string, description: string, imageURL: string, infoURL: string,
    //    model: string, ghostType: string, level: number, health: number,
    //        infusedType1: string, infusedType2: string, unboxed: bool, gender: string)
    //

    //Amazu Database Link: https://docs.google.com/spreadsheets/d/1sgk_jjGPukoZv_fIeM6xeXQ83gAOPBEKXi-sCD9ceLY/edit#gid=529186089
    //
    //.callContract('GFEST', 'mintHammer', [1, 25, 1, myAddress, 'mint ticker??', 10,
    //'hammer_wood', 'the most basic wooden hammer', 'http://amazumedia.com/GhostFestival/img/Hammers/hammer_wooden_1.mp4', 'info URL is:', '', 1, 100, false])

    //     .callContract('gas', 'SpendGas', [linkAddress])
    .callContract("gas", "SpendGas", [myAddress])
    .endScript();

  let apiUrl = "http://localhost:7080";

  link.sendTransaction("main", script, "festival1.0", function (result) {
    console.log(result);

    if (result.success) {
      alert("succes");
    } else {
      alert("failed");
    }
  });
}

////mintToken(editionId:number, editionMax:number, editionMode:number, creator:address, mintTicker:string, numOfNfts:number,
////name: string, description: string, imageURL: string, infoURL: string, itemType: string, level: number, prower: number, hasLocked: bool)

//script.callContract('HAMME', 'mintToken', [1, 25, 1, myAddress, 'mint ticker??', 10,
//    'hammer_wood', 'the most basic wooden hammer', 'http://amazumedia.com/GhostFestival/img/wooden_regular_hammer.PNG', 'info URL is:', '', 1, 100, false]);

////script.callcontract('stake', 'masterclaim', [myaddress]);
//script.callContract('gas', 'SpendGas', [myAddress]);

//}

//function testContract() {

//    const gasPrice = 100000;
//    const minGasLimit = 100000;
//    const myAddress = 'P2K8uxLqAxA5Szi3K9xoa6rUaouPRRqj9YyAt1CMrfSKt76'  //public address of wallet
//    const claimAddress = 'S3dNRtA9m8GqzYAcZF2EMbEfJAjL4EfuNupJfogeuhLtU3v'//contract address
//    const amountToStake = 50000 * 10 ** 8;

//    sb = new ScriptBuilder();

//    script = sb.callContract('gas', 'AllowGas', [myAddress, sb.nullAddress(), gasPrice, minGasLimit])

//        //stake
//        .callContract('stake', 'Stake', [
//            claimAddress,
//            amountToStake
//        ])
//        // call mint Ghost:
//        .callContract('GFEST', 'mintGhost', [0, 2500, myAddress, 'GFEST', 1,
//            2, 'Shadow', 'Shadow black ghost',
//            'http://amazumedia.com/GhostFestival/img/Ghosts/ghost_shadow_black.mp4', 'info URL is:',
//            'Black', 'OG', 0, 0, 'None', 'None', false, 'None',
//        ])

//        .callContract('gas', 'SpendGas', [myAddress])
//        .endScript();

//  link.signTx(script, null, function (result) {
//console.log('result signTx', result)

//if (result.error || result.hash.error) {
//    var error = result.error ? result.error : result.hash.error;
//    console.log(error)
//    bootbox.alert('Error: ' + error);
//}
//else if (result.success) {
//    var hash = result.hash;

//    setTimeout(function () {
//        $.getJSON(apiUrl + '/api/getTransaction?hashText=' + hash,
//            function (res) {
//                console.log(res)
//                if (
//                    res &&
//                    res.error &&
//                    res.error !== 'pending'
//                ) {
//                    console.log(res.error)
//                    bootbox.alert('error: ' + res.error);
//                } else {
//                    console.log('tx successful: ', (res.hash).substring(0, 10))
//                    bootbox.alert('Purchase success - tx hash: ' + (res.hash).substring(0, 10));
//                }
//            })
//    }, 2000);
//}

//    })
//}
