async function downloadFile(bid)
{
  console.log('download request')
  return new Promise((resolve,reject)=>{
  
  pat=app.getPath('userData')
  const file = fs.createWriteStream(pat+"/file.jpg");

  var body = JSON.stringify({
    'query' : {getS3DownloadUrl(deviceId: "+bid+"){url}}
    })


    console.log('in....')
  
   request({ 
    body:body, 
    followAllRedirects: true,
    headers: {
    'Content-Type': 'application/json',
    'Authorization':token
    },
    method: 'POST',
    url: urlCloud}, callback);

        

    function callback(error, response, body) {

      console.log(response)
           
    if (!error && response.statusCode == 200) {

    if(JSON.parse(body)['data']!=null)
    { 

      url=JSON.parse(body)['data']['getS3DownloadUrl']['url']

      const request = http.get(url, function(response) {
        response.pipe(file);
      
        file.on("finish", () => {
            file.close();
            console.log("Download Completed");
            resolve(1);
        });
     });

     console.log('finally...')

    }

  }
/*

document.addEventListener("DOMContentLoaded", function() {
    const configureButton = document.getElementById("configJig");


    // Function to check if the file exists
function checkFileExists(filename) {
    return new Promise((resolve, reject) => {
      // Simulate asynchronous check (e.g., using FileReader)
      const reader = new FileReader();
      reader.onload = () => resolve(true);
      reader.onerror = () => resolve(false);
      reader.readAsText(new Blob([filename], { type: 'text/plain' }));
    });
  }
  
  // Function to read data from the file
  function readFile(filename) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(filename);
    });
  }
  
  // Function to update the file with new data
  function updateFile(filename, newData) {
    const blob = new Blob([newData], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  function configJigValue() {
    const modal = document.getElementById("manualJig");
    const filename = 'cell_data.txt';
  
    // Check if the file exists
    checkFileExists(filename)
      .then(exists => {
        if (exists) {
          // File exists, read old data and populate input fields
          readFile(filename)
            .then(data => {
              const cellValues = data.split('\n');
              for (let i = 0; i < cellValues.length; i++) {
                document.getElementById('cell' + (i + 1)).value = cellValues[i];
              }
              modal.style.display = "block"; // Show modal after populating input fields
            })
            .catch(error => console.error("Error reading file:", error));
        } else {
          // File doesn't exist, show modal without old data
          modal.style.display = "block";
        }
      })
      .catch(error => console.error("Error checking file existence:", error));
  }
  
  function closed() {
    const modal = document.getElementById("manualJig");
    modal.style.display = "none";
  }
  
  function saveChanges() {
    const cellData = [];
    for (let i = 1; i <= 20; i++) {
      const cellValue = document.getElementById('cell' + i).value;
      cellData.push(cellValue);
    }
    const newData = cellData.join('\n');
    updateFile('cell_data.txt', newData);
  }
   */
  


  /*
    configureButton.addEventListener("click", function() {
      createOrOpenFile("config.txt");
    });
  
    function createOrOpenFile(filename) {
      // Check if the file exists
      checkFileExists(filename)
        .then(exists => {
          if (exists) {
            // File exists, open it
            openFile(filename);
          } else {
            // File doesn't exist, create it
            createFile(filename);
          }
        })
        .catch(error => {
          console.error("Error:", error);
        });
    }
  
    function checkFileExists(filename) {
      return new Promise((resolve, reject) => {
        // Simulate asynchronous check (e.g., API request or filesystem access)
        setTimeout(() => {
          // For demonstration purposes, let's assume the file exists if its name is not empty
          resolve(filename !== "");
        }, 1000); // Simulated delay of 1 second
      });
    }
  
    function openFile(filename) {
        // Check if the File API is supported by the browser
        if (window.File && window.FileReader && window.FileList && window.Blob) {
          // Use the File constructor to create a new File object
          const file = new File(["File content for " + filename], filename, { type: "text/plain" });
      
          // Use the URL.createObjectURL() method to generate a URL for the file
          const fileURL = URL.createObjectURL(file);
      
          // Open the file URL in a new window or tab
          window.open(fileURL);
        } else {
          // File API is not supported
          alert("File API is not supported in this browser. Cannot open file.");
        }
      }
  
      function createFile(filename) {
        // Create a Blob object with file content
        const blob = new Blob(["Initial content for " + filename], { type: "text/plain" });
      
        // Use the URL.createObjectURL() method to generate a URL for the Blob
        const fileURL = URL.createObjectURL(blob);
      
        // Create a link element
        const link = document.createElement("a");
      
        // Set the href attribute of the link to the file URL
        link.href = fileURL;
      
        // Set the download attribute of the link to the filename
        link.download = filename;
      
        // Append the link to the document body
        document.body.appendChild(link);
      
        // Programmatically click the link to trigger the file download
        link.click();
      
        // Remove the link from the document body
        document.body.removeChild(link);
      } 
  });

*/