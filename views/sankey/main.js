var colors = {
  'financial': '#edbd00',
  'account': '#367d85',
  'profile': '#97ba4c',
  'WSIL': '#f5662b',
  'N/A': '#3f3e47',
  'fallback': '#9f9fa3'
};
var defaultData = {
  'nodes': [{
    'name': 'SC1001 - Manage Profile - Addresses',
    'id': 'SC1001 - Manage Profile - Addresses'
  }, {'name': '203 getGeneralProfile', 'id': '203 getGeneralProfile'}, {
    'name': 'getCustomer',
    'id': 'getCustomer'
  }, {
    'name': 'CustomerDetailsWSIL.getCustomerDetails',
    'id': 'CustomerDetailsWSIL.getCustomerDetails'
  }, {
    'name': 'getLineOfServices',
    'id': 'getLineOfServices'
  }, {
    'name': 'FinancialAccountDetailsWSIL.getFinancialAccountDetails',
    'id': 'FinancialAccountDetailsWSIL.getFinancialAccountDetails'
  }, {
    'name': 'getLineOfServicesDetails',
    'id': 'getLineOfServicesDetails'
  }, {
    'name': 'LineOfServiceDetailsWSIL.getLineOfServiceDetails',
    'id': 'LineOfServiceDetailsWSIL.getLineOfServiceDetails'
  }, {'name': 'getFinancialAccount', 'id': 'getFinancialAccount'}, {
    'name': 'getFinancialAccountDetails',
    'id': 'getFinancialAccountDetails'
  }, {
    'name': 'getFinancialAccountDeviceDetails',
    'id': 'getFinancialAccountDeviceDetails'
  }, {
    'name': 'financialAccountDetailsWSIL.getAccountDeviceDetails',
    'id': 'financialAccountDetailsWSIL.getAccountDeviceDetails'
  }, {'name': 'getLineofServiceAddress', 'id': 'getLineofServiceAddress'}, {
    'name': '348 getStates',
    'id': '348 getStates'
  }, {'name': 'N/A', 'id': 'N/A'}, {
    'name': 'SC1113 - Manage Profile - Associations',
    'id': 'SC1113 - Manage Profile - Associations'
  }, {'name': '331 getRolePermissions', 'id': '331 getRolePermissions'}, {
    'name': 'getAccessibleParties',
    'id': 'getAccessibleParties'
  }, {
    'name': 'CustomerSummaryWSIL.getAccessibleParties',
    'id': 'CustomerSummaryWSIL.getAccessibleParties'
  }, {'name': '232 getOrderDetails', 'id': '232 getOrderDetails'}, {
    'name': 'getOrderDetails',
    'id': 'getOrderDetails'
  }, {'name': 'OrderWSIL.getOrderDetails', 'id': 'OrderWSIL.getOrderDetails'}, {
    'name': '306 getRoles',
    'id': '306 getRoles'
  }, {
    'name': 'getCustomerRoleTypes',
    'id': 'getCustomerRoleTypes'
  }, {
    'name': 'OrderReferenceDataWSIL.getCustomerRoleTypes ',
    'id': 'OrderReferenceDataWSIL.getCustomerRoleTypes '
  }, {'name': '305 postRolesPermissions', 'id': '305 postRolesPermissions'}, {
    'name': 'assignCustomerRole',
    'id': 'assignCustomerRole'
  }, {
    'name': 'CustomerUpdateWSIL.assignCustomerRole',
    'id': 'CustomerUpdateWSIL.assignCustomerRole'
  }, {'name': 'CancelOrder', 'id': 'CancelOrder'}, {
    'name': 'OrderUpdateWSIL.cancelOrder',
    'id': 'OrderUpdateWSIL.cancelOrder'
  }, {'name': 'updateCustomer', 'id': 'updateCustomer'}, {
    'name': 'CustomerUpdateWSIL.updateCustomer',
    'id': 'CustomerUpdateWSIL.updateCustomer'
  }, {'name': '266 postInputValidator', 'id': '266 postInputValidator'}, {
    'name': 'validateAddress',
    'id': 'validateAddress'
  }, {'name': 'AddressWSIL.validateAddress', 'id': 'AddressWSIL.validateAddress'}, {
    'name': 'searchLoginProfile',
    'id': 'searchLoginProfile'
  }, {'name': '204 postUpdateGeneralProfile', 'id': '204 postUpdateGeneralProfile'}, {
    'name': 'updateLoginProfile',
    'id': 'updateLoginProfile'
  }, {'name': 'updateLoginProfileEmail', 'id': 'updateLoginProfileEmail'}, {
    'name': 'updateLoginProfilePassword',
    'id': 'updateLoginProfilePassword'
  }, {'name': 'updateLoginProfileStatus', 'id': 'updateLoginProfileStatus'}, {
    'name': 'updateCustomerContact',
    'id': 'updateCustomerContact'
  }, {'name': 'ContactWSIL.updateContact', 'id': 'ContactWSIL.updateContact'}, {
    'name': 'updateFinancialAccount',
    'id': 'updateFinancialAccount'
  }, {
    'name': 'FinancialAccountWSIL.updateFinancialAccount',
    'id': 'FinancialAccountWSIL.updateFinancialAccount'
  }, {'name': '388 verifyConfirmationCode', 'id': '388 verifyConfirmationCode'}, {
    'name': 'sendSMSPINToMSISDN',
    'id': 'sendSMSPINToMSISDN'
  }, {'name': 'linkMSISDN', 'id': 'linkMSISDN'}, {
    'name': 'validatePIN',
    'id': 'validatePIN'
  }, {
    'name': '468 getUnassignedLines',
    'id': '468 getUnassignedLines'
  }, {
    'name': 'SC1139 - Manage Profile - Notifications',
    'id': 'SC1139 - Manage Profile - Notifications'
  }, {'name': '368 postSetNotifications', 'id': '368 postSetNotifications'}, {
    'name': 'updateLineOfService',
    'id': 'updateLineOfService'
  }, {
    'name': 'LineOfServiceUpdateWSIL.updateLineOfService',
    'id': 'LineOfServiceUpdateWSIL.updateLineOfService'
  }, {'name': '373 postAccountSettings', 'id': '373 postAccountSettings'}, {
    'name': '439 postPrivacySettings',
    'id': '439 postPrivacySettings'
  }, {'name': 'getAuthorizedApplications', 'id': 'getAuthorizedApplications'}, {
    'name': '0.0',
    'id': '0.0'
  }, {
    'name': 'SC1185 - Manage Profile - Billing & Payments',
    'id': 'SC1185 - Manage Profile - Billing & Payments'
  }, {'name': '144 getPaymentMethods', 'id': '144 getPaymentMethods'}, {
    'name': 'getStoredPaymentMethods',
    'id': 'getStoredPaymentMethods'
  }, {
    'name': 'SC1187 - Manage Profile - Preferences',
    'id': 'SC1187 - Manage Profile - Preferences'
  }, {'name': 'unLinkMSISDN', 'id': 'unLinkMSISDN'}, {
    'name': 'updatePrimaryMSISDN',
    'id': 'updatePrimaryMSISDN'
  }, {'name': '337 getSpecialInstructions', 'id': '337 getSpecialInstructions'}, {
    'name': 'getCustomerNotes',
    'id': 'getCustomerNotes'
  }, {'name': '346 postSendSms', 'id': '346 postSendSms'}, {
    'name': 'createNotification',
    'id': 'createNotification'
  }, {'name': '418 postSpecialInstructions  ', 'id': '418 postSpecialInstructions  '}, {
    'name': 'updateCustomerNotes',
    'id': 'updateCustomerNotes'
  }, {'name': 'removeCustomerNotes', 'id': 'removeCustomerNotes'}, {
    'name': 'createCustomerNotes',
    'id': 'createCustomerNotes'
  }, {'name': 'getNoteTypes', 'id': 'getNoteTypes'}, {
    'name': '999 getCustomerProfile',
    'id': '999 getCustomerProfile'
  }, {
    'name': 'N/A (Call to IAM queryIAMProfile)',
    'id': 'N/A (Call to IAM queryIAMProfile)'
  }, {
    'name': 'N/A (Call to IAM getToken)',
    'id': 'N/A (Call to IAM getToken)'
  }, {
    'name': 'SC1312 - Manage Profile - Blocking and Family Controls',
    'id': 'SC1312 - Manage Profile - Blocking and Family Controls'
  }, {'name': '369 postFamilyControls', 'id': '369 postFamilyControls'}, {
    'name': 'updateCart',
    'id': 'updateCart'
  }, {'name': 'CartWSIL.updateCart', 'id': 'CartWSIL.updateCart'}, {
    'name': '370 postBlockingControls',
    'id': '370 postBlockingControls'
  }, {'name': 'blockShortCodes', 'id': 'blockShortCodes'}, {
    'name': 'SC1426 - Manage Profile',
    'id': 'SC1426 - Manage Profile'
  }],
  'links': [{'source': 0, 'target': 1, 'value': 7}, {'source': 1, 'target': 2, 'value': 5}, {
    'source': 2,
    'target': 3,
    'value': 8
  }, {'source': 1, 'target': 4, 'value': 5}, {'source': 4, 'target': 5, 'value': 5}, {
    'source': 1,
    'target': 6,
    'value': 5
  }, {'source': 6, 'target': 7, 'value': 7}, {'source': 1, 'target': 8, 'value': 5}, {
    'source': 8,
    'target': 5,
    'value': 5
  }, {'source': 1, 'target': 9, 'value': 5}, {'source': 9, 'target': 5, 'value': 7}, {
    'source': 1,
    'target': 10,
    'value': 5
  }, {'source': 10, 'target': 11, 'value': 5}, {'source': 1, 'target': 12, 'value': 3}, {
    'source': 12,
    'target': 7,
    'value': 3
  }, {'source': 0, 'target': 13, 'value': 1}, {'source': 13, 'target': 14, 'value': 1}, {
    'source': 15,
    'target': 16,
    'value': 1
  }, {'source': 16, 'target': 17, 'value': 1}, {'source': 17, 'target': 18, 'value': 2}, {
    'source': 15,
    'target': 19,
    'value': 1
  }, {'source': 19, 'target': 20, 'value': 1}, {'source': 20, 'target': 21, 'value': 1}, {
    'source': 15,
    'target': 22,
    'value': 1
  }, {'source': 22, 'target': 23, 'value': 1}, {'source': 23, 'target': 24, 'value': 1}, {
    'source': 15,
    'target': 25,
    'value': 3
  }, {'source': 25, 'target': 26, 'value': 1}, {'source': 26, 'target': 27, 'value': 1}, {
    'source': 25,
    'target': 28,
    'value': 1
  }, {'source': 28, 'target': 29, 'value': 1}, {'source': 25, 'target': 30, 'value': 1}, {
    'source': 30,
    'target': 31,
    'value': 2
  }, {'source': 15, 'target': 32, 'value': 1}, {'source': 32, 'target': 33, 'value': 2}, {
    'source': 33,
    'target': 34,
    'value': 2
  }, {'source': 15, 'target': 1, 'value': 7}, {'source': 1, 'target': 35, 'value': 3}, {
    'source': 35,
    'target': 14,
    'value': 3
  }, {'source': 15, 'target': 36, 'value': 6}, {'source': 36, 'target': 37, 'value': 2}, {
    'source': 37,
    'target': 14,
    'value': 2
  }, {'source': 36, 'target': 38, 'value': 2}, {'source': 38, 'target': 14, 'value': 2}, {
    'source': 36,
    'target': 39,
    'value': 2
  }, {'source': 39, 'target': 14, 'value': 2}, {'source': 36, 'target': 40, 'value': 2}, {
    'source': 40,
    'target': 14,
    'value': 2
  }, {'source': 36, 'target': 41, 'value': 2}, {'source': 41, 'target': 42, 'value': 2}, {
    'source': 36,
    'target': 43,
    'value': 2
  }, {'source': 43, 'target': 44, 'value': 3}, {'source': 15, 'target': 45, 'value': 3}, {
    'source': 45,
    'target': 46,
    'value': 2
  }, {'source': 46, 'target': 14, 'value': 3}, {'source': 45, 'target': 47, 'value': 2}, {
    'source': 47,
    'target': 14,
    'value': 2
  }, {'source': 45, 'target': 48, 'value': 2}, {'source': 48, 'target': 14, 'value': 2}, {
    'source': 15,
    'target': 49,
    'value': 1
  }, {'source': 49, 'target': 17, 'value': 1}, {'source': 50, 'target': 51, 'value': 4}, {
    'source': 51,
    'target': 52,
    'value': 2
  }, {'source': 52, 'target': 53, 'value': 2}, {'source': 50, 'target': 54, 'value': 3}, {
    'source': 54,
    'target': 2,
    'value': 2
  }, {'source': 54, 'target': 6, 'value': 2}, {'source': 54, 'target': 9, 'value': 2}, {
    'source': 50,
    'target': 55,
    'value': 1
  }, {'source': 55, 'target': 56, 'value': 1}, {'source': 56, 'target': 57, 'value': 1}, {
    'source': 51,
    'target': 30,
    'value': 1
  }, {'source': 51, 'target': 43, 'value': 1}, {'source': 58, 'target': 59, 'value': 1}, {
    'source': 59,
    'target': 60,
    'value': 1
  }, {'source': 60, 'target': 57, 'value': 1}, {'source': 61, 'target': 1, 'value': 7}, {
    'source': 61,
    'target': 36,
    'value': 9
  }, {'source': 36, 'target': 46, 'value': 1}, {'source': 36, 'target': 62, 'value': 1}, {
    'source': 62,
    'target': 14,
    'value': 1
  }, {'source': 36, 'target': 63, 'value': 1}, {'source': 63, 'target': 14, 'value': 1}, {
    'source': 61,
    'target': 32,
    'value': 1
  }, {'source': 61, 'target': 64, 'value': 2}, {'source': 64, 'target': 65, 'value': 1}, {
    'source': 65,
    'target': 14,
    'value': 1
  }, {'source': 61, 'target': 66, 'value': 1}, {'source': 66, 'target': 67, 'value': 1}, {
    'source': 67,
    'target': 14,
    'value': 1
  }, {'source': 61, 'target': 68, 'value': 3}, {'source': 68, 'target': 69, 'value': 1}, {
    'source': 69,
    'target': 57,
    'value': 1
  }, {'source': 68, 'target': 70, 'value': 1}, {'source': 70, 'target': 57, 'value': 1}, {
    'source': 68,
    'target': 71,
    'value': 1
  }, {'source': 71, 'target': 57, 'value': 1}, {'source': 64, 'target': 72, 'value': 1}, {
    'source': 72,
    'target': 57,
    'value': 1
  }, {'source': 61, 'target': 45, 'value': 3}, {'source': 61, 'target': 73, 'value': 3}, {
    'source': 73,
    'target': 2,
    'value': 1
  }, {'source': 73, 'target': 74, 'value': 1}, {'source': 73, 'target': 75, 'value': 1}, {
    'source': 76,
    'target': 1,
    'value': 8
  }, {'source': 76, 'target': 54, 'value': 3}, {'source': 76, 'target': 77, 'value': 1}, {
    'source': 77,
    'target': 78,
    'value': 1
  }, {'source': 78, 'target': 79, 'value': 2}, {'source': 76, 'target': 80, 'value': 2}, {
    'source': 80,
    'target': 78,
    'value': 1
  }, {'source': 80, 'target': 81, 'value': 1}, {'source': 81, 'target': 57, 'value': 1}, {
    'source': 82,
    'target': 1,
    'value': 7
  }]
};

function loadChart(json, fieldName, fieldValueStr) {
  var link_count = Object.keys(json.links).length;
  var desired_height = (500 > +link_count * 10) ? 500 : +link_count * 10;
  $('#chart').height(desired_height);

  if (fieldName != '' && fieldValueStr != '') {
    var number_nodes_returned = Object.keys(json.nodes).length;
    console.log(fieldName);
    if (fieldName && fieldValueStr) {
      if (number_nodes_returned > 0) {
        alertify.notify('Your search for ' + fieldName.value + ':' + fieldValueStr +
          ' found ' + number_nodes_returned + ' APIs.', 'success', 5, function () {
          console.log('dismissed');
        });
      }
    }
  }

  if (number_nodes_returned !== 0) {
    function label(node) {
      return node.name.replace(/\s*\(.*?\)$/, '');
    }

    function color(node, depth) {
      for (var key in colors) {
        if (node.name.toLowerCase().indexOf(key) > -1) {
          return colors[key];
        }
      }
      if (depth > 0 && node.targetLinks && node.targetLinks.length == 1) {
        return color(node.targetLinks[0].source, depth - 1);
      } else {
        return null;
      }
    }

    var chart = d3.select('#chart').append('svg').chart('Sankey.Path');
    chart
      .name(label)
      .colorNodes(function (name, node) {
        return color(node, 1) || colors.fallback;
      })
      .colorLinks(function (link) {
        return color(link.source, 4) || color(link.target, 1) || colors.fallback;
      })
      .nodeWidth(15)
      .nodePadding(10)
      .spread(true)
      .iterations(30)
      .draw(json);

    if (document.getElementById('chart').childNodes.length > 1) { // Remove old chart
      var chart = document.getElementById('chart');
      chart.removeChild(chart.childNodes[0]);
    }
  } else {
    alertify.notify('No API\'s found with those parameters.', 'error', 5, function () {
      console.log('dismissed');
    });
  }

}

function getChart() {
  var fieldName = document.getElementById('field_name').value;
  var fieldValueStr = document.getElementById('field_values').value;

  var xmlhttp;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
  }
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      loadChart(JSON.parse(xmlhttp.responseText), field_name, fieldValueStr);
    }
  };

  if (fieldName !== '' && fieldValueStr !== '') {
    xmlhttp.open('GET', 'http://remotech2web.rebellion.t-mobile.com:8080/api?field_name=' + fieldName + '&field_value=' + fieldValueStr + '&sankey=true', true);
    // xmlhttp.open('GET', 'http://localhost:8080/api?field_name=' + fieldName + '&field_value=' + fieldValueStr + '&sankey=true', true);
    xmlhttp.send();
  } else {
    loadChart(defaultData);
  }
}

$(document).keypress(function(e) {
  if(e.which == 13) {
    console.log('enter pressed!');
    getChart();
  }
});
