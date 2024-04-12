async function downloadFile(bid) {
  console.log('download request');
  return new Promise((resolve, reject) => {
      pat = app.getPath('userData');
      const file = fs.createWriteStream(pat + "/file.jpg");

     /* var body = JSON.stringify({
          'query': { getS3DownloadUrl(deviceId: "+bid+") { url } }
      });
*/
      console.log('in....');

      request({
          body: body,
          followAllRedirects: true,
          headers: {
              'Content-Type': 'application/json',
              'Authorization': token
          },
          method: 'POST',
          url: urlCloud
      }, callback);

      function callback(error, response, body) {
          console.log(response);
          if (!error && response.statusCode == 200) {
              if (JSON.parse(body)['data'] != null) {
                  url = JSON.parse(body)['data']['getS3DownloadUrl']['url'];
                  const request = http.get(url, function(response) {
                      response.pipe(file);
                      file.on("finish", () => {
                          file.close();
                          console.log("Download Completed");
                          resolve(1);
                      });
                  });
                  console.log('finally...');
              }
          }
      }
  });
}
