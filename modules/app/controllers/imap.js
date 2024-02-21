const { Op } = require("sequelize");
let paginationHelpers = require("../../../helpers/pagination");
const database = require("../../../utils/calls/databaseRequest");
const sequelize = require("../../../sequelize/sequelize");
const Sequelize = require("sequelize");
const moment = require("moment");
var imaps = require('imap-simple');
const networkRequest = require("./../../../utils/calls/networkRequest");
const qs = require('qs');
const imapConfig = require('../../../config/imapConfig.json');



const getInvoices = async function(req, res, next){   
  let email_data = {};
  let user = imapConfig.production.user;
  let password = imapConfig.production.password;
  let host = imapConfig.production.host;
  let port = imapConfig.production.port;

  var config = {
    imap: {
        user: user,
        password: password,
        host: host,
        port: port,
        tls: true,
        authTimeout: 3000
    }
};

imaps.connect(config).then(function (connection) {

  connection.openBox('INBOX').then(function () {

      var searchCriteria = ['UNSEEN'];
      var fetchOptions = { bodies: ['HEADER', 'TEXT'], struct: true, markSeen: true };

      // retrieve only the headers of the messages
      return connection.search(searchCriteria, fetchOptions);
  }).then(function aysnc (messages) {

      var attachments = [];

      messages.forEach(function (message) {

          var subjects =  message.parts.filter(function (part) {
              return part.which === 'HEADER';
          })[0].body.subject[0];
  
          var parts = imaps.getParts(message.attributes.struct);
          attachments = attachments.concat(parts.filter(function (part) {

              return part.disposition && part.disposition.type.toUpperCase() === 'ATTACHMENT';
          }).map(function (part) {

              // retrieve the attachments only of the messages with attachments
              return connection.getPartData(message, part)
                  .then(function (partData) {
                      return {
                          subject: subjects,
                          filename: part.disposition.params.filename,
                          data: partData.toString('base64')
                      };
                  });
          }));
      });

      return Promise.all(attachments);
  }).then(async function (attachments) {
      console.log(attachments);

      email_data = await attachments;

      /***********Adding mail data in mysql DB for further processing */
      attachments.forEach(attachment => {

      const regex = /#\w+/g;
      // Extract words starting with "#"
      let folderId = attachment.subject.match(regex);
      // Remove "#" and whitespace from the beginning of the string
      const numericString = folderId[0].replace(/^#\s*/, '');
      // Parse the numeric string as an integer
      const folder_id = parseInt(numericString);
      console.log(folder_id);
      let app_invoice =  (new sequelize.models.app_invoices({}));
      app_invoice.file_name = attachment.filename;
      app_invoice.subject = attachment.subject;
      app_invoice.folder_id = folder_id;
      app_invoice.file_base64 = attachment.data;
      
      app_invoice.save();
    
      });
    });
  });

return next(imaps);
}


const syncInvoices = async (req, res, next) => {
  try {

    let findQuery = {
      where: [{
        status: '0'
      }],
      attributes: [
        "id",
        "file_name",
        "subject",
        "application_id",
        "folder_id",
        "file_base64",
        "status",
        "created_at",
      ],
    };

    

    let PO_BASE_URL = imapConfig.production.poBaseURL;
    let tokenAuth = imapConfig.production.tokenAuth;
    let authUrl = PO_BASE_URL + imapConfig.production.authSlug;
    let authHeaders = {
      "Accept": "*/*",
     // "Content-Type": 'application/json',
      "Authorization": "Basic "+tokenAuth
  };
  

    let invoices = await sequelize.models.app_invoices.findAll(findQuery);
    if (invoices && invoices.length > 0) {
      for (let invoice of invoices) {

        let findInvoiceQuery = {
          where: {
            id: invoice.id
          }
        }
        let invoice_data = await sequelize.models.app_invoices.findOne(findInvoiceQuery);

        //////// Get Access token from PowerOffice
        let access_token;
        let authBody = qs.stringify({
          'grant_type': 'client_credentials' 
        });
        let tokenResultData = await networkRequest.postWithHeaders(authUrl, "", authHeaders, authBody);
        if(tokenResultData){
          access_token = tokenResultData.data.access_token
        }
        console.log("access_token:", access_token);


        ////////// upload invoice folder / document to PowerOffice
        let year = moment().year();
        let period = moment().month();
       // let yearString = year.toString();
       // let parentfolderStatus = false;
        let folder_id;

        let PO_BASE_URL = imapConfig.production.poBaseURL;

      //  let addFolderUrl = PO_BASE_URL + imapConfig.production.addFolderSlug;
        let addDocumentUrl = PO_BASE_URL + imapConfig.production.addDocumentSlug;
       /// let getFolderUrl = PO_BASE_URL + imapConfig.production.getFolders+`$filter=(Name%20eq%20`+yearString+`)`;
       //  let newFolderResponse;
       // let parentFolderResponse;
       // let parentFolderID;

        let headers = {
          "Accept": "*/*",
          "Content-Type": 'application/json',
          "Authorization": "Bearer "+access_token
      };


      /************ Checking existing parent folder */
      // let parentfolderResult = await networkRequest.getWithHeaders(getFolderUrl, headers);
      // console.log(parentfolderResult);
      // if(parentfolderResult.data.success){
      //   parentfolderStatus = true;
      //   parentFolderID = parentfolderResult.data.data.id;
      // }else{
      //   parentfolderStatus = false;
      // }

      /************ Creating new parent folder in PowerOffice */
      // if(parentfolderStatus == false){
      //   let addParentFolderBody = {
      //     "name": yearString,
      //     "externalReference": yearString
      //   }
      //   parentFolderResponse = await networkRequest.postWithHeaders(addFolderUrl, "", headers, addParentFolderBody);
      //     console.log(parentFolderResponse.data);
      //     if(parentFolderResponse.data.success){
      //       parentFolderID = parentFolderResponse.data.data.id;
      //     }
      // }


      /************ Creating inner folder for this application in PowerOffice */
        // let addFolderBody = {
        //   "name": invoice.application_id,
        //   "parentFolderId": parentFolderID,
        //   "externalReference": invoice.application_id
        // }
        //   newFolderResponse = await networkRequest.postWithHeaders(addFolderUrl, "", headers, addFolderBody);
        //   console.log(newFolderResponse.data);
        

        /************ Adding invoice document to the newly added folder in PowerOffice */
     //   if(newFolderResponse.data.success){

          folder_id = invoice.folder_id;
          const match = invoice.subject.match(/Re: (.+?) er godkjent/);

          // Extracting the desired substring from the matched result
          let subject = match ? match[1] : null;
          if(subject == "" || subject == null || !subject){
            const match2 = invoice.subject.match(/(.+?) er godkjent/);
            subject = match2 ? match2[1] : null;
          }

                let body = {
                  "documentVersions": [{
                      "filename": invoice.file_name,
                      "externalReference": subject
                  }],
                  "base64EncodedData": invoice.file_base64,
                  "filename": invoice.file_name,
                  "folderId": folder_id,
                  "year": year,
                  "period": period,
                  "externalReference": subject
              }
              let responseData = await networkRequest.postWithHeaders(addDocumentUrl, "", headers, body);

              console.log("sync body:", body);
              console.log("file sync response:", responseData.data);

                  /********** updated status of synced invoice */
                  if(responseData.data.success){
                    invoice_data.status = '1';
                    invoice_data.response = JSON.stringify(responseData.data);
                    await invoice_data.save();
                  }else{
                    invoice_data.response = JSON.stringify(responseData.data);
                    await invoice_data.save();
                  }
                  /////////////////////////
        //    }
            // else{
            //   invoice_data.response = JSON.stringify(newFolderResponse.data);
            //   await invoice_data.save();
            // }
          
      }

      let response = {
        invoices: invoices.length + " invoices synced."
      };
      return next(response); 

    } else {
      let err = new TypeError('invocies_not_found')
      return next(err);
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getInvoices,
  syncInvoices
};
