export const toll = value => {
  const content = `<!DOCTYPE html>
<html>
  <head>
    <title>Hello, World!</title>
    <style>
      .containertoll {
        padding: 10px;
      }
      * {
        padding-bottom: 0px;
        margin-bottom: 0px;
        font-family: 'Roboto', sans-serif;
      }

      .wrap1Text {
        font-weight: bold;
        color: #000;
        font-size: 30px;
        text-align: center;
        margin-bottom: 8px;
      }

      .wrap2 {
        border: 1px dotted #000;
        margin-top: 25px;
        position: relative;
      }

      .s {
        position: absolute;
        right: 70px;
        bottom: 120px;
        font-size: 150px;
        font-weight: bold;
        color: #333;
      }

      .wrap2Head {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px dashed grey;
        padding-top: 10px;
        padding-bottom: 10px;
        margin: 10px;
      }

      .wrap2HeadText {
        color: #666;
        font-size: 25px;
        padding-bottom: 8px;
        font-weight: 600;
      }

      .wrap2body {
        padding: 10px;
      }

      .tablehead {
        display: flex;
        flex-direction: row;
        padding-top: 2px;
        padding-bottom: 2px;
      }

      .tableheadData1 {
        width: 40%;
        color: #000000;
        font-weight: 400;
        font-size: 25px;
        margin-bottom: 10px;
      }

      .tableheadData2 {
        width: 60%;
        color: #000;
        font-weight: 900;
        font-size: 25px;
        /* margin-bottom: 4px; */
      }

      .wrap3 {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
      }

      .wrap3Text {
        color: #000;
        font-size: 25px;
      }
    </style>
    <!-- <link rel="stylesheet" href="toll.css" /> -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap"
      rel="stylesheet" />
    <!-- <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet"> -->
  </head>

  <body>
    <div class="containertoll">
      <div class="wrap1">
        <div id="id_company" class="wrap1Text"> ${value?.companyName}</div>
        <div id="id_company_address" class="wrap1Text">${
          value?.companyAddress
        }</div>
      </div>

      <div class="wrap2">
        <p class="s">${value?.journeyType}</p>
        <div class="wrap2Head">
          <div class="wrap2HeadText">Date : ${value?.date}</div>
          <div class="wrap2HeadText">Lane ${value?.lane}</div>
        </div>
        <div class="wrap2body">
          <div class="tablehead">
            <div class="tableheadData1">Vehicle Class</div>
            <div class="tableheadData2">: &ensp; MAV (3 to 6 Axles)</div>
          </div>
          <div class="tablehead">
            <div class="tableheadData1">Vehicle No</div>
            <div class="tableheadData2">: &ensp; ${
              value?.vehicleDetails?.vehicle_number
            }</div>
          </div>
          <div class="tablehead">
            <div class="tableheadData1">Ticket Type</div>
            <div class="tableheadData2">: &ensp; ${
              value?.journeyType?.toLowerCase() === 'S'
                ? 'Single Journey'
                : 'Double Journey'
            }</div>
          </div>
          <div class="tablehead">
            <div class="tableheadData1">Ticket Amount</div>
            <div class="tableheadData2">: &ensp; Rs.${value?.ticketAmount}</div>
          </div>
          <div class="tablehead">
            <div class="tableheadData1">Payment By</div>
            <div class="tableheadData2">: &ensp; Cash Payment</div>
          </div>
          <div class="tablehead">
            <div class="tableheadData1">Non-Fastag Penalty</div>
            <div class="tableheadData2">: &ensp; Rs.0</div>
          </div>
          <div class="tablehead">
            <div class="tableheadData1">OverWeight Charge</div>
            <div class="tableheadData2">: &ensp; Rs.${
              value?.overWeightCharge
            }</div>
          </div>
          <div class="tablehead">
            <div class="tableheadData1">Total Amount</div>
            <div class="tableheadData2">: &ensp; Rs.${value?.totalAmount}</div>
          </div>
          <div class="tablehead">
            <div class="tableheadData1">Allowed Weight</div>
            <div class="tableheadData2">: &ensp; Kg.7500</div>
          </div>
          <div class="tablehead">
            <div class="tableheadData1">Vehicle Weight</div>
            <div class="tableheadData2">: &ensp; Kg.${
              value?.vehicleDetails?.vehicle_weight
            }</div>
          </div>
          <div class="tablehead">
            <div class="tableheadData1">Over Weight</div>
            <div class="tableheadData2">: &ensp; Kg.0</div>
          </div>
          <div class="tablehead">
            <div class="tableheadData1">Ticket Number</div>
            <div class="tableheadData2" style="font-size: 30px">
              : &ensp;${value?.ticketNumber}
            </div>
          </div>
        </div>
      </div>

      <div class="wrap3" style="margin-top: 15px">
        <div class="wrap3Text" style="text-align: center; font-size: 30px">
          :: HAPPY JOURNEY ::
        </div>
        <br/>
        <div class="wrap3Text">Accident Brings Tears, Safety Brings Cheers</div>
        <div class="wrap3Text">
          <span style="color: #555; font-size: 12px">●</span> Retain this ticket
          till journey is over
        </div>
        <div class="wrap3Text" style="margin-left: 8px">
          You may have to produce on demand.
        </div>
        <div class="wrap3Text" style="font-weight: bold">
          <span style="color: #555; font-size: 12px">●</span> Help Line Number :
          9519213304
        </div>
      </div>
    </div>
  </body>
</html>
`;

  return content;
};
