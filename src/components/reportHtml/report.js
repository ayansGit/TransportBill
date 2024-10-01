export const getReportHTML = reportList => {
  return new Promise((resolve, reject) => {
    try {
      const content = `
        <html>
          <head>
            <style>
              body {
                font-family: 'Helvetica';
                font-size: 12px;
              }
              header, footer {
                height: 50px;
                background-color: #fff;
                color: #000;
                display: flex;
                justify-content: center;
                padding: 0 20px;
              }
              table {
                width: 100%;
                border-collapse: collapse;
              }
              th, td {
                border: 1px solid #000;
                padding: 5px;
              }
              th {
                background-color: #ccc;
              }
            </style>
          </head>
          <body>
            <header>
              <h1>Report</h1>
            </header>
            <h1>Tracking Summary</h1>
            <table>
              <tr>
                <th>Time</th>
                <th>From Location</th>
                <th>From Time</th>
                <th>To Location</th>
                <th>To Time</th>
                <th>Status</th>
              </tr>
              ${reportList
                .map(
                  line => `
                <tr>
                  <td>${line.total_time}</td>
                  <td>${line.from_location_name}</td>
                  <td>${line.from_time}</td>
                  <td>${line.to_location_name}</td>
                  <td>${line.NewTime ? line.NewTime : line.to_time}</td>
                  <td>${line.status}</td>
                </tr>
              `,
                )
                .join('')}
            </table>
            <footer>
              <p>Thank you for your business!</p>
            </footer>
          </body>
        </html>
      `;
      resolve(content);
    } catch (error) {
      reject(error);
    }
  });
};
