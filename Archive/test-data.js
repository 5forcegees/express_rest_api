var request = require("request");

var requestHeaders = {
    "Origin": "http://npe-retailqat1-eelb-419640238.us-west-2.elb.amazonaws.com",
    "Accept-Encoding": "gzip, deflate, sdch",
    "Accept-Language": "en-US,en;q=0.8",
    "interactionId": "MIL_MEMPHIS_16227829657931454633713231",
    "channelId": "RETAIL",
    "Connection": "keep-alive",
    "senderId": "TMO",
    "applicationId": "REBELLION-1.0",
    "Pragma": "no-cache",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.97 Safari/537.36",
    "activityId": "145463371323127829657930.19302984536625445",
    "scope": "",
    "Accept": "application/json, text/plain, */*",
    "applicationUserId": "MIL_MEMPHIS_162"
};

function postResults(apiLogObject) {
    console.log("in postResults ",apiLogObject);
    if (apiLogObject.response.length >100000) {
        apiLogObject.response = "Large result, size: " + apiLogObject.response.length;
    }

    request({
        uri: "http://remotech2web.rebellion.t-mobile.com:8080/api/results",
        method: "POST",
        json: apiLogObject
    }, function(error, response, body) {
        console.log(response);
    });
}

var checkAPI = function(name, uri, method, headers, requestBody) {
    var startTime = new Date().getTime();
    request({
      uri: uri,
      method: method,
      headers: headers,
      json: requestBody
    }, function(error, response, body) {
        responseStatus = "DOWN";
        if (response.statusCode == 200) {
            responseStatus = "UP";
        }
        console.log(response);
        var apiLogObject = {
            name: name,
            httpstatus: response.statusCode,
            status: responseStatus,
            api_checked_date: new Date(),
            elapsed_time: new Date().getTime() - startTime,
            headers: JSON.stringify(requestHeaders),
            request: JSON.stringify(requestBody),
            response: JSON.stringify(response.body)
        };
        // console.log(apiLogObject);
        postResults(apiLogObject);
        console.log("after postResults");
        
    });
}

checkAPI("SearchCustomer (Facade)",
    "https://rebelliondev-qat01.apigee.net/assisted-customer/v1/customers/search?msisdn=2522033638&offset=0&limit=10&sort=msisdn&sortOrder=asc&filter=accStatus=all,lineStatus=all,accType=all,accSubType=all",
    "GET",
    requestHeaders,
    {});

checkAPI("GetCustomerDetails (Facade)",
    "https://rebelliondev-qat01.apigee.net/assisted-customer/v1/customers/3100021970/info",
    "GET",
    requestHeaders,
    {});

checkAPI("PP AvailableOffers (Facade)",
    "https://rebelliondev-qat01.apigee.net/purchase-path/v1/available-offers",
    "POST",
    requestHeaders,
    {"ctx":{"accountId":"","customerId":"","dealerId":"","location":"98006","channel":"web","storeId":"","creditRating":"good","billingType":"prepaid","ui-cart":{},"orderType":"ADDALINE","lineId":"","accountOffers":{}},"productType":["Plan"],"productSubType":{"include":[],"omit":[]},"selection":"","limit":12,"children":false,"nested":true,"markSoftConflicts":false,"markHardConflicts":false,"imei":"","sort":{},"filter":{},"search":{}});

checkAPI("PP Conflicts (Facade)",
    "https://rebelliondev-qat01.apigee.net/purchase-path/v1/conflicts",
    "GET",
    requestHeaders,
    {"ctx":{"accountId":"","customerId":"anonymous","dealerId":"","location":"98006","channel":"web","storeId":"","creditRating":"good","billingType":"prepaid","ui-cart":{},"orderType":"ADDALINE","lineId":"","accountOffers":{}},"selection":["SO_NASC_01GB_PRE"],"checkFor":"all-conflicts"});

checkAPI("PP Non-Conflicting Offers (Facade)",
    "https://rebelliondev-qat01.apigee.net/purchase-path/v1/non-conflicting-offers",
    "GET",
    requestHeaders,
    {"ctx":{"accountId":"","customerId":"","dealerId":"","location":"98006","channel":"web","storeId":"","creditRating":"good","billingType":"prepaid","ui-cart":{},"orderType":"ADDALINE","lineId":"","accountOffers":{}},"productType":["Accessory","Device","Plan","Service"],"productSubType":{"include":[],"omit":[]},"selection":["SO_NASC_01GB_PRE"],"limit":"","children":false,"nested":false,"markSoftConflicts":true,"markHardConflicts":true,"imei":"","sort":{},"filter":{},"search":{},"complexLimit":{"accessories":{"limit":20,"offset":0},"devices":{"limit":12,"offset":0},"plans":{"limit":6,"offset":0},"services":{"limit":1,"offset":0}}});
