# WireMock SmartSheet Server
A custom WireMock JAR with SmartSheet specific configuration

## Installation

Java Runtime Environment 8 is required to run WireMock

## How to Launch

Run the launch.sh script in a bash console:

```bash
$ sh launch.sh
```

This will launch a fully configured WireMock server running on port 8082.

## How to Use

The scenarios listed in the scenario section below can be called as specified. For example, the 'List Sheets' endpoint can be called by making a GET request to http://localhost:8082/sheets.

# Configured Scenarios
* [List Automation Rules](#list-automation-rules)
* [Get Automation Rule](#get-automation-rule)
* [Update Automation Rule](#update-automation-rule)
* [Delete Automation Rule](#delete-automation-rule)
* [Update Column - Change Type - Picklist](#update-column---change-type---picklist)
* [Update Column - Change Type - Contact List](#update-column---change-type---contact-list)
* [Change Agent Header - Can Be Passed](#change-agent-header---can-be-passed)
* [Assume User - Can Be Set](#assume-user---can-be-set)
* [Move row to another sheet](#move-row-to-another-sheet)
* [Copy row to another sheet](#copy-row-to-another-sheet)
* [Add Rows - Assign Values - String](#add-rows---assign-values---string)
* [Add Rows - Assign Values - Int](#add-rows---assign-values---int)
* [Add Rows - Assign Values - Bool](#add-rows---assign-values---bool)
* [Add Rows - Assign Formulae](#add-rows---assign-formulae)
* [Add Rows - Assign Values - Hyperlink](#add-rows---assign-values---hyperlink)
* [Add Rows - Assign Values - Hyperlink SheetID](#add-rows---assign-values---hyperlink-sheetid)
* [Add Rows - Assign Values - Hyperlink ReportID](#add-rows---assign-values---hyperlink-reportid)
* [Add Rows - Invalid - Assign Value and Formulae](#add-rows---invalid---assign-value-and-formulae)
* [Add Rows - Invalid - Assign Hyperlink URL and SheetId](#add-rows---invalid---assign-hyperlink-url-and-sheetid)
* [Add Rows - Location - Top](#add-rows---location---top)
* [Add Rows - Location - Bottom](#add-rows---location---bottom)
* [Update Rows - Assign Values - String](#update-rows---assign-values---string)
* [Update Rows - Assign Values - Int](#update-rows---assign-values---int)
* [Update Rows - Assign Values - Bool](#update-rows---assign-values---bool)
* [Update Rows - Assign Formulae](#update-rows---assign-formulae)
* [Update Rows - Assign Values - Hyperlink](#update-rows---assign-values---hyperlink)
* [Update Rows - Assign Values - Hyperlink SheetID](#update-rows---assign-values---hyperlink-sheetid)
* [Update Rows - Assign Values - Hyperlink ReportID](#update-rows---assign-values---hyperlink-reportid)
* [Update Rows - Invalid - Assign Value and Formulae](#update-rows---invalid---assign-value-and-formulae)
* [Update Rows - Invalid - Assign Hyperlink URL and SheetId](#update-rows---invalid---assign-hyperlink-url-and-sheetid)
* [Add Rows - Assign Object Value - Predecessor List](#add-rows---assign-object-value---predecessor-list)
* [Add Rows - Assign Object Value - Predecessor List (using floats)](#add-rows---assign-object-value---predecessor-list-(using-floats))
* [Update Rows - Clear Value - Text Number](#update-rows---clear-value---text-number)
* [Update Rows - Clear Value - Checkbox](#update-rows---clear-value---checkbox)
* [Update Rows - Clear Value - Hyperlink](#update-rows---clear-value---hyperlink)
* [Update Rows - Clear Value - Cell Link](#update-rows---clear-value---cell-link)
* [Update Rows - Clear Value - Predecessor List](#update-rows---clear-value---predecessor-list)
* [Update Rows - Invalid - Assign Hyperlink and Cell Link](#update-rows---invalid---assign-hyperlink-and-cell-link)
* [Update Rows - Location - Top](#update-rows---location---top)
* [Update Rows - Location - Bottom](#update-rows---location---bottom)
* [List Sheets - No Params](#list-sheets---no-params)
* [List Sheets - Include Owner Info](#list-sheets---include-owner-info)
* [Create Sheet - Invalid - No Columns](#create-sheet---invalid---no-columns)
* [List Sights](#list-sights)
* [Get Sight](#get-sight)
* [Copy Sight](#copy-sight)
* [Update Sight](#update-sight)
* [Set Sight Publish Status](#set-sight-publish-status)
* [Get Sight Publish Status](#get-sight-publish-status)
* [Delete Sight](#delete-sight)

## List Automation Rules



### Expected Request

#### GET - /sheets/324/automationrules

### Response

#### Status - 200 OK

```json
{
  "pageNumber": 1,
  "pageSize": 100,
  "totalPages": 1,
  "totalCount": 2,
  "data": [
    {
      "id": 284,
      "name": "End Date Changed",
      "enabled": true,
      "createdBy": {
        "name": "John Doe",
        "email": "j.doe@example.com"
      },
      "createdAt": "2018-02-25T23:04:36Z",
      "modifiedBy": {
        "name": "John Doe",
        "email": "j.doe@example.com"
      },
      "modifiedAt": "2018-02-25T23:04:36Z",
      "userCanModify": true,
      "action": {
        "type": "NOTIFICATION_ACTION",
        "frequency": "IMMEDIATELY",
        "message": "",
        "includeAllColumns": true,
        "includeAttachments": true,
        "includeDiscussions": true,
        "notifyAllSharedUsers": true
      }
    },
    {
      "id": 684,
      "name": "Schedule Change Notification",
      "enabled": true,
      "createdBy": {
        "name": "Jane Doe",
        "email": "jane@example.com"
      },
      "createdAt": "2018-02-25T23:02:57Z",
      "modifiedBy": {
        "name": "Jane Doe",
        "email": "jane@example.com"
      },
      "modifiedAt": "2018-02-25T23:02:57Z",
      "userCanModify": true,
      "action": {
        "type": "NOTIFICATION_ACTION",
        "recipients": [
          {
            "email": "j.doe@example.com"
          }
        ],
        "frequency": "DAILY",
        "includeAllColumns": true,
        "includeAttachments": true,
        "includeDiscussions": true,
        "notifyAllSharedUsers": false
      }
    }
  ]
}
```

## Get Automation Rule



### Expected Request

#### GET - /sheets/324/automationrules/284

### Response

#### Status - 200 OK

```json
{
  "id": 284,
  "name": "End Date Changed",
  "enabled": true,
  "createdBy": {
    "name": "John Doe",
    "email": "j.doe@example.com"
  },
  "createdAt": "2018-02-25T23:04:36Z",
  "modifiedBy": {
    "name": "John Doe",
    "email": "j.doe@example.com"
  },
  "modifiedAt": "2018-02-25T23:04:36Z",
  "userCanModify": true,
  "action": {
    "type": "NOTIFICATION_ACTION",
    "frequency": "IMMEDIATELY",
    "message": "",
    "includeAllColumns": true,
    "includeAttachments": true,
    "includeDiscussions": true,
    "notifyAllSharedUsers": true
  }
}
```

## Update Automation Rule



### Expected Request

#### PUT - /sheets/324/automationrules/284

#### Headers

* Content-Type: application/json

#### Body

```json
{
  "action": {
    "frequency": "WEEKLY",
    "recipients": [
      {
        "email": "jane@example.com"
      }
    ],
    "type": "NOTIFICATION_ACTION"
  }
}
```

### Response

#### Status - 200 OK

```json
{
  "id": 284,
  "name": "End Date Changed",
  "enabled": true,
  "createdBy": {
    "name": "John Doe",
    "email": "j.doe@example.com"
  },
  "createdAt": "2018-02-25T23:04:36Z",
  "modifiedBy": {
    "name": "John Doe",
    "email": "j.doe@example.com"
  },
  "modifiedAt": "2018-02-25T23:13:53Z",
  "userCanModify": true,
  "action": {
    "type": "NOTIFICATION_ACTION",
    "recipients": [
      {
        "email": "jane@example.com"
      }
    ],
    "frequency": "WEEKLY",
    "message": "",
    "includeAllColumns": true,
    "includeAttachments": true,
    "includeDiscussions": true,
    "notifyAllSharedUsers": false
  }
}
```

## Delete Automation Rule



### Expected Request

#### DELETE - /sheets/324/automationrules/284

### Response

#### Status - 200 OK

```json
{
  "message": "SUCCESS",
  "resultCode": 0
}
```

## Update Column - Change Type - Picklist

Tests the serialization of a column object and PICKLIST options.

### Expected Request

#### PUT - /sheets/123/columns/234

#### Headers

* Content-Type: application/json

#### Body

```json
{
  "index": 2,
  "title": "Updated Column",
  "type": "PICKLIST",
  "options": [
    "An",
    "updated",
    "column"
  ],
  "width": 200
}
```

### Response

#### Status - 200 OK

```json
{
  "message": "SUCCESS",
  "resultCode": 0,
  "result": {
    "id": 234,
    "index": 2,
    "title": "Updated Column",
    "type": "PICKLIST",
    "options": [
      "An",
      "updated",
      "column"
    ],
    "validation": false,
    "width": 200
  }
}
```

## Update Column - Change Type - Contact List

Tests the serialization of a column object and contact options.

### Expected Request

#### PUT - /sheets/123/columns/234

#### Headers

* Content-Type: application/json

#### Body

```json
{
  "index": 2,
  "title": "Updated Column",
  "type": "CONTACT_LIST",
  "contactOptions": [
    {
      "name": "Some Contact",
      "email": "some.contact@smartsheet.com"
    },
    {
      "name": "Some Other Contact",
      "email": "some.other.contact@smartsheet.com"
    }
  ],
  "width": 200
}
```

### Response

#### Status - 200 OK

```json
{
  "message": "SUCCESS",
  "resultCode": 0,
  "result": {
    "id": 234,
    "index": 2,
    "title": "Updated Column",
    "type": "CONTACT_LIST",
    "contactOptions": [
      {
        "name": "Some Contact",
        "email": "some.contact@smartsheet.com"
      },
      {
        "name": "Some Other Contact",
        "email": "some.other.contact@smartsheet.com"
      }
    ],
    "validation": false,
    "width": 200
  }
}
```

## Change Agent Header - Can Be Passed



### Expected Request

#### POST - /sheets

#### Headers

* Content-Type: application/json
* Smartsheet-Change-Agent: MyChangeAgent

#### Body

```json
{
  "name": "My new sheet",
  "columns": [
    {
      "title": "Col1",
      "primary": true,
      "type": "TEXT_NUMBER"
    }
  ]
}
```

### Response

#### Status - 200 OK

```json
{
  "message": "SUCCESS",
  "resultCode": 0,
  "result": {
    "id": 12345,
    "name": "My new sheet",
    "accessLevel": "OWNER",
    "permalink": "https://app.smartsheet.com/b/home?lx=HrZUjI0TKih546aFyBaeoA",
    "columns": [
      {
        "id": 23456,
        "index": 0,
        "title": "Col1",
        "type": "TEXT_NUMBER",
        "primary": true,
        "validation": false,
        "width": 150
      }
    ]
  }
}
```

## Assume User - Can Be Set



### Expected Request

#### GET - /sheets/123

#### Headers

* Assume-User: john.doe%40smartsheet.com

### Response

#### Status - 200 OK

```json
{
  "id": 123,
  "name": "New Sheet",
  "version": 73,
  "totalRowCount": 6,
  "accessLevel": "OWNER",
  "effectiveAttachmentOptions": [
    "FILE",
    "DROPBOX",
    "ONEDRIVE",
    "GOOGLE_DRIVE",
    "EGNYTE",
    "BOX_COM",
    "EVERNOTE"
  ],
  "ganttEnabled": false,
  "dependenciesEnabled": false,
  "resourceManagementEnabled": false,
  "cellImageUploadEnabled": true,
  "favorite": true,
  "showParentRowsForFilters": false,
  "userSettings": {
    "criticalPathEnabled": false,
    "displaySummaryTasks": true,
    "appliedSheetFilterId": 3290686083622788
  },
  "permalink": "https://app.smartsheet.com/b/home?lx=d2k4ve3v9X3S1fjXxNDLw",
  "createdAt": "2017-11-03T15:27:29Z",
  "modifiedAt": "2018-03-02T23:50:35Z",
  "columns": [
    {
      "id": 234,
      "index": 0,
      "title": "Primary Column",
      "type": "TEXT_NUMBER",
      "primary": true,
      "validation": false,
      "width": 150
    }
  ],
  "rows": [
    {
      "id": 345,
      "rowNumber": 1,
      "expanded": true,
      "createdAt": "2018-02-02T23:32:35Z",
      "modifiedAt": "2018-02-09T17:08:41Z",
      "cells": [
        {
          "columnId": 234,
          "value": "Some Value",
          "displayValue": "Some Value"
        }
      ]
    }
  ]
}
```

## Move row to another sheet

Move single row to another sheet

### Expected Request

#### POST - /sheets/1228520367122308/rows/move

#### Headers

* Content-Type: application/json

#### Body

```json
{
  "rowIds": [
    1765250516182916
  ],
  "to": {
    "sheetId": 799249123305348
  }
}
```

### Response

#### Status - 200 OK

```json
{
  "destinationSheetId": 799249123305348,
  "rowMappings": [
    {
      "from": 1765250516182916,
      "to": 6754140747523972
    }
  ]
}
```

## Copy row to another sheet

Copy single row to another sheet

### Expected Request

#### POST - /sheets/1228520367122308/rows/copy

#### Headers

* Content-Type: application/json

#### Body

```json
{
  "rowIds": [
    2891150423025540
  ],
  "to": {
    "sheetId": 799249123305348
  }
}
```

### Response

#### Status - 200 OK

```json
{
  "destinationSheetId": 799249123305348,
  "rowMappings": [
    {
      "from": 2891150423025540,
      "to": 1655705329526660
    }
  ]
}
```

## Add Rows - Assign Values - String

Creates new rows containing cells with string values. Returns a valid response with a list of rows.

### Expected Request

#### POST - /sheets/1/rows

#### Headers

* Content-Type: application/json

#### Body

```json
[
  {
    "cells": [
      {
        "columnId": 101,
        "value": "Apple"
      },
      {
        "columnId": 102,
        "value": "Red Fruit"
      }
    ]
  },
  {
    "cells": [
      {
        "columnId": 101,
        "value": "Banana"
      },
      {
        "columnId": 102,
        "value": "Yellow Fruit"
      }
    ]
  }
]
```

### Response

#### Status - 200 OK

```json
{
  "message": "SUCCESS",
  "resultCode": 0,
  "result": [
    {
      "id": 10,
      "rowNumber": 1,
      "expanded": true,
      "createdAt": "2017-10-17T23:16:08Z",
      "modifiedAt": "2017-10-17T23:20:18Z",
      "cells": [
        {
          "columnId": 101,
          "value": "Apple",
          "displayValue": "Apple"
        },
        {
          "columnId": 102,
          "value": "Red Fruit",
          "displayValue": "Red Fruit"
        }
      ]
    },
    {
      "id": 11,
      "rowNumber": 2,
      "expanded": true,
      "createdAt": "2017-10-17T23:16:08Z",
      "modifiedAt": "2017-10-17T23:20:18Z",
      "cells": [
        {
          "columnId": 101,
          "value": "Banana",
          "displayValue": "Banana"
        },
        {
          "columnId": 102,
          "value": "Yellow Fruit",
          "displayValue": "Yellow Fruit"
        }
      ]
    }
  ],
  "version": 14
}
```

## Add Rows - Assign Values - Int

Creates new rows containing cells with numerical values. Returns a valid response with a list of rows.

### Expected Request

#### POST - /sheets/1/rows

#### Headers

* Content-Type: application/json

#### Body

```json
[
  {
    "cells": [
      {
        "columnId": 101,
        "value": 100
      },
      {
        "columnId": 102,
        "value": "One Hundred"
      }
    ]
  },
  {
    "cells": [
      {
        "columnId": 101,
        "value": 2.1
      },
      {
        "columnId": 102,
        "value": "Two Point One"
      }
    ]
  }
]
```

### Response

#### Status - 200 OK

```json
{
  "message": "SUCCESS",
  "resultCode": 0,
  "result": [
    {
      "id": 10,
      "rowNumber": 1,
      "expanded": true,
      "createdAt": "2017-10-17T23:16:08Z",
      "modifiedAt": "2017-10-17T23:20:18Z",
      "cells": [
        {
          "columnId": 101,
          "value": 100,
          "displayValue": "100"
        },
        {
          "columnId": 102,
          "value": "One Hundred",
          "displayValue": "One Hundred"
        }
      ]
    },
    {
      "id": 11,
      "rowNumber": 2,
      "siblingId": 10,
      "expanded": true,
      "createdAt": "2017-10-17T23:16:08Z",
      "modifiedAt": "2017-10-17T23:20:18Z",
      "cells": [
        {
          "columnId": 101,
          "value": 2.1,
          "displayValue": "2.1"
        },
        {
          "columnId": 102,
          "value": "Two Point One",
          "displayValue": "Two Point One"
        }
      ]
    }
  ],
  "version": 7
}
```

## Add Rows - Assign Values - Bool

Creates new rows containing cells with boolean values. Returns a valid response with a list of rows.

### Expected Request

#### POST - /sheets/1/rows

#### Headers

* Content-Type: application/json

#### Body

```json
[
  {
    "cells": [
      {
        "columnId": 101,
        "value": true
      },
      {
        "columnId": 102,
        "value": "This is True"
      }
    ]
  },
  {
    "cells": [
      {
        "columnId": 101,
        "value": false
      },
      {
        "columnId": 102,
        "value": "This is False"
      }
    ]
  }
]
```

### Response

#### Status - 200 OK

```json
{
  "message": "SUCCESS",
  "resultCode": 0,
  "result": [
    {
      "id": 10,
      "rowNumber": 1,
      "expanded": true,
      "createdAt": "2017-10-17T23:16:08Z",
      "modifiedAt": "2017-10-17T23:20:18Z",
      "cells": [
        {
          "columnId": 101,
          "value": true,
          "displayValue": "true"
        },
        {
          "columnId": 102,
          "value": "This is True",
          "displayValue": "This is True"
        }
      ]
    },
    {
      "id": 11,
      "rowNumber": 2,
      "siblingId": 10,
      "expanded": true,
      "createdAt": "2017-10-17T23:16:08Z",
      "modifiedAt": "2017-10-17T23:20:18Z",
      "cells": [
        {
          "columnId": 101,
          "value": false,
          "displayValue": "false"
        },
        {
          "columnId": 102,
          "value": "This is False",
          "displayValue": "This is False"
        }
      ]
    }
  ],
  "version": 7
}
```

## Add Rows - Assign Formulae

Creates new rows containing cells with formulae. Returns a valid response with a list of rows.

### Expected Request

#### POST - /sheets/1/rows

#### Headers

* Content-Type: application/json

#### Body

```json
[
  {
    "cells": [
      {
        "columnId": 101,
        "formula": "=SUM([Column2]3, [Column2]4)*2"
      },
      {
        "columnId": 102,
        "formula": "=SUM([Column2]3, [Column2]3, [Column2]4)"
      }
    ]
  }
]
```

### Response

#### Status - 200 OK

```json
{
  "message": "SUCCESS",
  "resultCode": 0,
  "result": [
    {
      "id": 11,
      "rowNumber": 5,
      "expanded": true,
      "createdAt": "2017-10-18T20:21:51Z",
      "modifiedAt": "2017-10-18T20:32:40Z",
      "cells": [
        {
          "columnId": 101,
          "value": 14,
          "displayValue": "14",
          "formula": "=SUM([Column2]3, [Column2]4)*2"
        },
        {
          "columnId": 102,
          "value": 10,
          "displayValue": "10",
          "formula": "=SUM([Column2]3, [Column2]3, [Column2]4)"
        }
      ]
    }
  ],
  "version": 8
}
```

## Add Rows - Assign Values - Hyperlink

Creates new rows containing cells with hyperlink objects to url and string values. Returns a valid response with a list of rows.

### Expected Request

#### POST - /sheets/1/rows

#### Headers

* Content-Type: application/json

#### Body

```json
[
  {
    "cells": [
      {
        "columnId": 101,
        "value": "Google",
        "hyperlink": {
          "url": "http://google.com"
        }
      },
      {
        "columnId": 102,
        "value": "Bing",
        "hyperlink": {
          "url": "http://bing.com"
        }
      }
    ]
  }
]
```

### Response

#### Status - 200 OK

```json
{
  "message": "SUCCESS",
  "resultCode": 0,
  "result": [
    {
      "id": 10,
      "rowNumber": 1,
      "expanded": true,
      "createdAt": "2017-10-17T23:16:08Z",
      "modifiedAt": "2017-10-17T23:20:18Z",
      "cells": [
        {
          "columnId": 101,
          "value": "Google",
          "displayValue": "Google",
          "hyperlink": {
            "url": "http://google.com"
          }
        },
        {
          "columnId": 102,
          "value": "Bing",
          "displayValue": "Bing",
          "hyperlink": {
            "url": "http://bing.com"
          }
        }
      ]
    }
  ],
  "version": 7
}
```

## Add Rows - Assign Values - Hyperlink SheetID

Creates new rows containing cells with hyperlink object to sheet and string values. Returns a valid response with a list of rows.

### Expected Request

#### POST - /sheets/1/rows

#### Headers

* Content-Type: application/json

#### Body

```json
[
  {
    "cells": [
      {
        "columnId": 101,
        "value": "Sheet2",
        "hyperlink": {
          "sheetId": 2
        }
      },
      {
        "columnId": 102,
        "value": "Sheet3",
        "hyperlink": {
          "sheetId": 3
        }
      }
    ]
  }
]
```

### Response

#### Status - 200 OK

```json
{
  "message": "SUCCESS",
  "resultCode": 0,
  "result": [
    {
      "id": 10,
      "rowNumber": 1,
      "expanded": true,
      "createdAt": "2017-10-17T23:16:08Z",
      "modifiedAt": "2017-10-17T23:20:18Z",
      "cells": [
        {
          "columnId": 101,
          "value": "Sheet2",
          "displayValue": "Sheet2",
          "hyperlink": {
            "sheetId": 2
          }
        },
        {
          "columnId": 102,
          "value": "Sheet3",
          "displayValue": "Sheet3",
          "hyperlink": {
            "sheetId": 3
          }
        }
      ]
    }
  ],
  "version": 7
}
```

## Add Rows - Assign Values - Hyperlink ReportID

Creates new rows containing cells with hyperlink object to report and string values. Returns a valid response with a list of rows.

### Expected Request

#### POST - /sheets/1/rows

#### Headers

* Content-Type: application/json

#### Body

```json
[
  {
    "cells": [
      {
        "columnId": 101,
        "value": "Report9",
        "hyperlink": {
          "reportId": 9
        }
      },
      {
        "columnId": 102,
        "value": "Report8",
        "hyperlink": {
          "reportId": 8
        }
      }
    ]
  }
]
```

### Response

#### Status - 200 OK

```json
{
  "message": "SUCCESS",
  "resultCode": 0,
  "result": [
    {
      "id": 10,
      "rowNumber": 1,
      "expanded": true,
      "createdAt": "2017-10-17T23:16:08Z",
      "modifiedAt": "2017-10-17T23:20:18Z",
      "cells": [
        {
          "columnId": 101,
          "value": "Report9",
          "displayValue": "Report9",
          "hyperlink": {
            "reportId": 9
          }
        },
        {
          "columnId": 102,
          "value": "Report8",
          "displayValue": "Report8",
          "hyperlink": {
            "reportId": 8
          }
        }
      ]
    }
  ],
  "version": 7
}
```

## Add Rows - Invalid - Assign Value and Formulae

Creates new rows containing cells with values and formulae. Returns a bad request failure response

### Expected Request

#### POST - /sheets/1/rows

#### Headers

* Content-Type: application/json

#### Body

```json
[
  {
    "cells": [
      {
        "columnId": 101,
        "formula": "=SUM([Column2]3, [Column2]4)*2",
        "value": "20"
      },
      {
        "columnId": 102,
        "formula": "=SUM([Column2]3, [Column2]3, [Column2]4)"
      }
    ]
  }
]
```

### Response

#### Status - 400 Bad Request

```json
{
  "errorCode": 1163,
  "message": "If cell.formula is specified, then value, objectValue, image, hyperlink, and linkInFromCell must not be specified.",
  "refId": "123abc",
  "detail": {
    "index": 0,
    "rowId": 10
  }
}
```

## Add Rows - Invalid - Assign Hyperlink URL and SheetId

Creates new rows containing cells with hyperlink object of url and sheet. Returns a bad request failure response

### Expected Request

#### POST - /sheets/1/rows

#### Headers

* Content-Type: application/json

#### Body

```json
[
  {
    "cells": [
      {
        "columnId": 101,
        "value": "Google",
        "hyperlink": {
          "url": "http://google.com",
          "sheetId": 2
        }
      },
      {
        "columnId": 102,
        "value": "Bing",
        "hyperlink": {
          "url": "http://bing.com"
        }
      }
    ]
  }
]
```

### Response

#### Status - 400 Bad Request

```json
{
  "errorCode": 1112,
  "message": "hyperlink.url must be null for sheet, report, or Sight hyperlinks.",
  "refId": "dbwn8owxskam",
  "detail": {
    "index": 0
  }
}
```

## Add Rows - Location - Top

Creates new rows containing cells with string values to be set as the top row. Returns a valid response with a list of rows.

### Expected Request

#### POST - /sheets/1/rows

#### Headers

* Content-Type: application/json

#### Body

```json
[
  {
    "toTop": true,
    "cells": [
      {
        "columnId": 101,
        "value": "Apple"
      },
      {
        "columnId": 102,
        "value": "Red Fruit"
      }
    ]
  }
]
```

### Response

#### Status - 200 OK

```json
{
  "message": "SUCCESS",
  "resultCode": 0,
  "result": [
    {
      "id": 10,
      "rowNumber": 1,
      "expanded": true,
      "createdAt": "2017-10-17T23:16:08Z",
      "modifiedAt": "2017-10-17T23:20:18Z",
      "cells": [
        {
          "columnId": 101,
          "value": "Apple",
          "displayValue": "Apple"
        },
        {
          "columnId": 102,
          "value": "Red Fruit",
          "displayValue": "Red Fruit"
        }
      ]
    }
  ],
  "version": 14
}
```

## Add Rows - Location - Bottom

Creates new rows containing cells with string values to be set as the bottom row. Returns a valid response with a list of rows.

### Expected Request

#### POST - /sheets/1/rows

#### Headers

* Content-Type: application/json

#### Body

```json
[
  {
    "toBottom": true,
    "cells": [
      {
        "columnId": 101,
        "value": "Apple"
      },
      {
        "columnId": 102,
        "value": "Red Fruit"
      }
    ]
  }
]
```

### Response

#### Status - 200 OK

```json
{
  "message": "SUCCESS",
  "resultCode": 0,
  "result": [
    {
      "id": 10,
      "rowNumber": 100,
      "expanded": true,
      "createdAt": "2017-10-17T23:16:08Z",
      "modifiedAt": "2017-10-17T23:20:18Z",
      "cells": [
        {
          "columnId": 101,
          "value": "Apple",
          "displayValue": "Apple"
        },
        {
          "columnId": 102,
          "value": "Red Fruit",
          "displayValue": "Red Fruit"
        }
      ]
    }
  ],
  "version": 14
}
```

## Update Rows - Assign Values - String

Updates rows with cells containing string values. Returns a valid response with a list of rows.

### Expected Request

#### PUT - /sheets/1/rows

#### Headers

* Content-Type: application/json

#### Body

```json
[
  {
    "id": 10,
    "cells": [
      {
        "columnId": 101,
        "value": "Apple"
      },
      {
        "columnId": 102,
        "value": "Red Fruit"
      }
    ]
  },
  {
    "id": 11,
    "cells": [
      {
        "columnId": 101,
        "value": "Banana"
      },
      {
        "columnId": 102,
        "value": "Yellow Fruit"
      }
    ]
  }
]
```

### Response

#### Status - 200 OK

```json
{
  "message": "SUCCESS",
  "resultCode": 0,
  "result": [
    {
      "id": 10,
      "rowNumber": 1,
      "expanded": true,
      "createdAt": "2017-10-17T23:16:08Z",
      "modifiedAt": "2017-10-17T23:20:18Z",
      "cells": [
        {
          "columnId": 101,
          "value": "Apple",
          "displayValue": "Apple"
        },
        {
          "columnId": 102,
          "value": "Red Fruit",
          "displayValue": "Red Fruit"
        }
      ]
    },
    {
      "id": 11,
      "rowNumber": 2,
      "siblingId": 10,
      "expanded": true,
      "createdAt": "2017-10-17T23:16:08Z",
      "modifiedAt": "2017-10-17T23:20:18Z",
      "cells": [
        {
          "columnId": 101,
          "value": "Banana",
          "displayValue": "Banana"
        },
        {
          "columnId": 102,
          "value": "Yellow Fruit",
          "displayValue": "Yellow Fruit"
        }
      ]
    }
  ],
  "version": 7
}
```

## Update Rows - Assign Values - Int

Updates rows with cells containing numerical values. Returns a valid response with a list of rows.

### Expected Request

#### PUT - /sheets/1/rows

#### Headers

* Content-Type: application/json

#### Body

```json
[
  {
    "id": 10,
    "cells": [
      {
        "columnId": 101,
        "value": 100
      },
      {
        "columnId": 102,
        "value": "One Hundred"
      }
    ]
  },
  {
    "id": 11,
    "cells": [
      {
        "columnId": 101,
        "value": 2.1
      },
      {
        "columnId": 102,
        "value": "Two Point One"
      }
    ]
  }
]
```

### Response

#### Status - 200 OK

```json
{
  "message": "SUCCESS",
  "resultCode": 0,
  "result": [
    {
      "id": 10,
      "rowNumber": 1,
      "expanded": true,
      "createdAt": "2017-10-17T23:16:08Z",
      "modifiedAt": "2017-10-17T23:20:18Z",
      "cells": [
        {
          "columnId": 101,
          "value": 100,
          "displayValue": "100"
        },
        {
          "columnId": 102,
          "value": "One Hundred",
          "displayValue": "One Hundred"
        }
      ]
    },
    {
      "id": 11,
      "rowNumber": 2,
      "siblingId": 10,
      "expanded": true,
      "createdAt": "2017-10-17T23:16:08Z",
      "modifiedAt": "2017-10-17T23:20:18Z",
      "cells": [
        {
          "columnId": 101,
          "value": 2.1,
          "displayValue": "2.1"
        },
        {
          "columnId": 102,
          "value": "Two Point One",
          "displayValue": "Two Point One"
        }
      ]
    }
  ],
  "version": 7
}
```

## Update Rows - Assign Values - Bool

Updates rows with cells containing boolean values. Returns a valid response with a list of rows.

### Expected Request

#### PUT - /sheets/1/rows

#### Headers

* Content-Type: application/json

#### Body

```json
[
  {
    "id": 10,
    "cells": [
      {
        "columnId": 101,
        "value": true
      },
      {
        "columnId": 102,
        "value": "This is True"
      }
    ]
  },
  {
    "id": 11,
    "cells": [
      {
        "columnId": 101,
        "value": false
      },
      {
        "columnId": 102,
        "value": "This is False"
      }
    ]
  }
]
```

### Response

#### Status - 200 OK

```json
{
  "message": "SUCCESS",
  "resultCode": 0,
  "result": [
    {
      "id": 10,
      "rowNumber": 1,
      "expanded": true,
      "createdAt": "2017-10-17T23:16:08Z",
      "modifiedAt": "2017-10-17T23:20:18Z",
      "cells": [
        {
          "columnId": 101,
          "value": true,
          "displayValue": "true"
        },
        {
          "columnId": 102,
          "value": "This is True",
          "displayValue": "This is True"
        }
      ]
    },
    {
      "id": 11,
      "rowNumber": 2,
      "siblingId": 10,
      "expanded": true,
      "createdAt": "2017-10-17T23:16:08Z",
      "modifiedAt": "2017-10-17T23:20:18Z",
      "cells": [
        {
          "columnId": 101,
          "value": false,
          "displayValue": "false"
        },
        {
          "columnId": 102,
          "value": "This is False",
          "displayValue": "This is False"
        }
      ]
    }
  ],
  "version": 7
}
```

## Update Rows - Assign Formulae

Updates rows with cells containing formulae. Returns a valid response with a list of rows.

### Expected Request

#### PUT - /sheets/1/rows

#### Headers

* Content-Type: application/json

#### Body

```json
[
  {
    "id": 11,
    "cells": [
      {
        "columnId": 101,
        "formula": "=SUM([Column2]3, [Column2]4)*2"
      },
      {
        "columnId": 102,
        "formula": "=SUM([Column2]3, [Column2]3, [Column2]4)"
      }
    ]
  }
]
```

### Response

#### Status - 200 OK

```json
{
  "message": "SUCCESS",
  "resultCode": 0,
  "result": [
    {
      "id": 11,
      "rowNumber": 5,
      "expanded": true,
      "createdAt": "2017-10-18T20:21:51Z",
      "modifiedAt": "2017-10-18T20:32:40Z",
      "cells": [
        {
          "columnId": 101,
          "value": 14,
          "displayValue": "14",
          "formula": "=SUM([Column2]3, [Column2]4)*2"
        },
        {
          "columnId": 102,
          "value": 10,
          "displayValue": "10",
          "formula": "=SUM([Column2]3, [Column2]3, [Column2]4)"
        }
      ]
    }
  ],
  "version": 8
}
```

## Update Rows - Assign Values - Hyperlink

Updates rows with cells containing hyperlink objects to url and string values. Returns a valid response with a list of rows.

### Expected Request

#### PUT - /sheets/1/rows

#### Headers

* Content-Type: application/json

#### Body

```json
[
  {
    "id": 10,
    "cells": [
      {
        "columnId": 101,
        "value": "Google",
        "hyperlink": {
          "url": "http://google.com"
        }
      },
      {
        "columnId": 102,
        "value": "Bing",
        "hyperlink": {
          "url": "http://bing.com"
        }
      }
    ]
  }
]
```

### Response

#### Status - 200 OK

```json
{
  "message": "SUCCESS",
  "resultCode": 0,
  "result": [
    {
      "id": 10,
      "rowNumber": 1,
      "expanded": true,
      "createdAt": "2017-10-17T23:16:08Z",
      "modifiedAt": "2017-10-17T23:20:18Z",
      "cells": [
        {
          "columnId": 101,
          "value": "Google",
          "displayValue": "Google",
          "hyperlink": {
            "url": "http://google.com"
          }
        },
        {
          "columnId": 102,
          "value": "Bing",
          "displayValue": "Bing",
          "hyperlink": {
            "url": "http://bing.com"
          }
        }
      ]
    }
  ],
  "version": 7
}
```

## Update Rows - Assign Values - Hyperlink SheetID

Updates rows with cells containing hyperlink object to sheet and string values. Returns a valid response with a list of rows.

### Expected Request

#### PUT - /sheets/1/rows

#### Headers

* Content-Type: application/json

#### Body

```json
[
  {
    "id": 10,
    "cells": [
      {
        "columnId": 101,
        "value": "Sheet2",
        "hyperlink": {
          "sheetId": 2
        }
      },
      {
        "columnId": 102,
        "value": "Sheet3",
        "hyperlink": {
          "sheetId": 3
        }
      }
    ]
  }
]
```

### Response

#### Status - 200 OK

```json
{
  "message": "SUCCESS",
  "resultCode": 0,
  "result": [
    {
      "id": 10,
      "rowNumber": 1,
      "expanded": true,
      "createdAt": "2017-10-17T23:16:08Z",
      "modifiedAt": "2017-10-17T23:20:18Z",
      "cells": [
        {
          "columnId": 101,
          "value": "Sheet2",
          "displayValue": "Sheet2",
          "hyperlink": {
            "sheetId": 2
          }
        },
        {
          "columnId": 102,
          "value": "Sheet3",
          "displayValue": "Sheet3",
          "hyperlink": {
            "sheetId": 3
          }
        }
      ]
    }
  ],
  "version": 7
}
```

## Update Rows - Assign Values - Hyperlink ReportID

Updates rows with cells containing hyperlink object to report and string values. Returns a valid response with a list of rows.

### Expected Request

#### PUT - /sheets/1/rows

#### Headers

* Content-Type: application/json

#### Body

```json
[
  {
    "id": 10,
    "cells": [
      {
        "columnId": 101,
        "value": "Report9",
        "hyperlink": {
          "reportId": 9
        }
      },
      {
        "columnId": 102,
        "value": "Report8",
        "hyperlink": {
          "reportId": 8
        }
      }
    ]
  }
]
```

### Response

#### Status - 200 OK

```json
{
  "message": "SUCCESS",
  "resultCode": 0,
  "result": [
    {
      "id": 10,
      "rowNumber": 1,
      "expanded": true,
      "createdAt": "2017-10-17T23:16:08Z",
      "modifiedAt": "2017-10-17T23:20:18Z",
      "cells": [
        {
          "columnId": 101,
          "value": "Report9",
          "displayValue": "Report9",
          "hyperlink": {
            "reportId": 9
          }
        },
        {
          "columnId": 102,
          "value": "Report8",
          "displayValue": "Report8",
          "hyperlink": {
            "reportId": 8
          }
        }
      ]
    }
  ],
  "version": 7
}
```

## Update Rows - Invalid - Assign Value and Formulae

Updates rows with cells containing values and formulae. Returns a bad request failure response

### Expected Request

#### PUT - /sheets/1/rows

#### Headers

* Content-Type: application/json

#### Body

```json
[
  {
    "id": 10,
    "cells": [
      {
        "columnId": 101,
        "formula": "=SUM([Column2]3, [Column2]4)*2",
        "value": "20"
      },
      {
        "columnId": 102,
        "formula": "=SUM([Column2]3, [Column2]3, [Column2]4)"
      }
    ]
  }
]
```

### Response

#### Status - 400 Bad Request

```json
{
  "errorCode": 1163,
  "message": "If cell.formula is specified, then value, objectValue, image, hyperlink, and linkInFromCell must not be specified.",
  "refId": "123abc",
  "detail": {
    "index": 0,
    "rowId": 10
  }
}
```

## Update Rows - Invalid - Assign Hyperlink URL and SheetId

Updates rows with cells containing hyperlink object of url and sheet. Returns a bad request failure response

### Expected Request

#### PUT - /sheets/1/rows

#### Headers

* Content-Type: application/json

#### Body

```json
[
  {
    "id": 10,
    "cells": [
      {
        "columnId": 101,
        "value": "Google",
        "hyperlink": {
          "url": "http://google.com",
          "sheetId": 2
        }
      },
      {
        "columnId": 102,
        "value": "Bing",
        "hyperlink": {
          "url": "http://bing.com"
        }
      }
    ]
  }
]
```

### Response

#### Status - 400 Bad Request

```json
{
  "errorCode": 1112,
  "message": "hyperlink.url must be null for sheet, report, or Sight hyperlinks.",
  "refId": "dbwn8owxskam",
  "detail": {
    "index": 0,
    "rowId": 10
  }
}
```

## Add Rows - Assign Object Value - Predecessor List

Tests the predecessor list object type. Verifies extra fields (value, formula) are not set.

### Expected Request

#### POST - /sheets/1/rows

#### Headers

* Content-Type: application/json

#### Body

```json
[
  {
    "cells": [
      {
        "columnId": 101,
        "objectValue": {
          "objectType": "PREDECESSOR_LIST",
          "predecessors": [
            {
              "rowId": 10,
              "type": "FS",
              "lag": {
                "objectType": "DURATION",
                "days": 2,
                "hours": 4
              }
            }
          ]
        }
      }
    ]
  }
]
```

### Response

#### Status - 200 OK

```json
{
  "message": "SUCCESS",
  "resultCode": 0,
  "result": [
    {
      "id": 11,
      "sheetId": 1,
      "rowNumber": 2,
      "siblingId": 10,
      "expanded": true,
      "createdAt": "2017-11-02T20:58:34Z",
      "modifiedAt": "2017-11-02T20:58:34Z",
      "cells": [
        {
          "columnId": 102,
          "value": "2017-11-07T13:00:00",
          "formula": "=CALCSTART(Duration3, Start2, Finish2, 0, 72000000)"
        },
        {
          "columnId": 101,
          "value": "2FS +2d 4h",
          "displayValue": "2FS +2d 4h"
        }
      ]
    }
  ],
  "version": 5
}
```

## Add Rows - Assign Object Value - Predecessor List (using floats)

Tests the predecessor list object type. Verifies extra fields (value, formula) are not set.

### Expected Request

#### POST - /sheets/1/rows

#### Headers

* Content-Type: application/json

#### Body

```json
[
  {
    "cells": [
      {
        "columnId": 101,
        "objectValue": {
          "objectType": "PREDECESSOR_LIST",
          "predecessors": [
            {
              "rowId": 10,
              "type": "FS",
              "lag": {
                "objectType": "DURATION",
                "days": 2.5
              }
            }
          ]
        }
      }
    ]
  }
]
```

### Response

#### Status - 200 OK

```json
{
  "message": "SUCCESS",
  "resultCode": 0,
  "result": [
    {
      "id": 11,
      "sheetId": 1,
      "rowNumber": 2,
      "siblingId": 10,
      "expanded": true,
      "createdAt": "2017-11-02T20:58:34Z",
      "modifiedAt": "2017-11-02T20:58:34Z",
      "cells": [
        {
          "columnId": 102,
          "value": "2017-11-07T13:00:00",
          "formula": "=CALCSTART(Duration3, Start2, Finish2, 0, 72000000)"
        },
        {
          "columnId": 101,
          "value": "2FS +2.5d",
          "displayValue": "2FS +2.5d"
        }
      ]
    }
  ],
  "version": 5
}
```

## Update Rows - Clear Value - Text Number

Tests the ability to send an empty string to clear a text/number cell value

### Expected Request

#### PUT - /sheets/1/rows

#### Headers

* Content-Type: application/json

#### Body

```json
[
  {
    "id": 10,
    "cells": [
      {
        "columnId": 101,
        "value": ""
      }
    ]
  }
]
```

### Response

#### Status - 200 OK

```json
{
  "message": "SUCCESS",
  "resultCode": 0,
  "result": [
    {
      "id": 10,
      "rowNumber": 1,
      "expanded": true,
      "createdAt": "2017-11-03T15:31:33Z",
      "modifiedAt": "2017-11-03T15:43:27Z",
      "cells": [
        {
          "columnId": 101
        }
      ]
    }
  ],
  "version": 8
}
```

## Update Rows - Clear Value - Checkbox

Tests the ability to send an empty string to clear a cell value in a checkbox column. The cell will be set to false rather than cleared

### Expected Request

#### PUT - /sheets/1/rows

#### Headers

* Content-Type: application/json

#### Body

```json
[
  {
    "id": 10,
    "cells": [
      {
        "columnId": 101,
        "value": ""
      }
    ]
  }
]
```

### Response

#### Status - 200 OK

```json
{
  "message": "SUCCESS",
  "resultCode": 0,
  "result": [
    {
      "id": 10,
      "rowNumber": 1,
      "expanded": true,
      "createdAt": "2017-11-03T15:31:33Z",
      "modifiedAt": "2017-11-03T15:43:27Z",
      "cells": [
        {
          "columnId": 101,
          "value": false
        }
      ]
    }
  ],
  "version": 8
}
```

## Update Rows - Clear Value - Hyperlink

Tests the ability to to clear a cell with a hyper link.

### Expected Request

#### PUT - /sheets/1/rows

#### Headers

* Content-Type: application/json

#### Body

```json
[
  {
    "id": 10,
    "cells": [
      {
        "columnId": 101,
        "value": "",
        "hyperlink": null
      }
    ]
  }
]
```

### Response

#### Status - 200 OK

```json
{
  "message": "SUCCESS",
  "resultCode": 0,
  "result": [
    {
      "id": 10,
      "rowNumber": 1,
      "expanded": true,
      "createdAt": "2017-11-03T15:31:33Z",
      "modifiedAt": "2017-11-03T15:43:27Z",
      "cells": [
        {
          "columnId": 101
        }
      ]
    }
  ],
  "version": 8
}
```

## Update Rows - Clear Value - Cell Link

Tests the ability to to clear a cell with a cell link.

### Expected Request

#### PUT - /sheets/1/rows

#### Headers

* Content-Type: application/json

#### Body

```json
[
  {
    "id": 10,
    "cells": [
      {
        "columnId": 101,
        "value": "",
        "linkInFromCell": null
      }
    ]
  }
]
```

### Response

#### Status - 200 OK

```json
{
  "message": "SUCCESS",
  "resultCode": 0,
  "result": [
    {
      "id": 10,
      "rowNumber": 1,
      "expanded": true,
      "createdAt": "2017-11-03T15:31:33Z",
      "modifiedAt": "2017-11-03T15:43:27Z",
      "cells": [
        {
          "columnId": 101
        }
      ]
    }
  ],
  "version": 8
}
```

## Update Rows - Clear Value - Predecessor List

Verifies that it is possible to clear a predecessor list using the update rows endpoint

### Expected Request

#### PUT - /sheets/1/rows

#### Headers

* Content-Type: application/json

#### Body

```json
[
  {
    "id": 10,
    "cells": [
      {
        "columnId": 123,
        "value": null
      }
    ]
  }
]
```

### Response

#### Status - 200 OK

```json
{
  "message": "SUCCESS",
  "resultCode": 0,
  "result": [
    {
      "id": 10,
      "rowNumber": 1,
      "siblingId": 234,
      "expanded": true,
      "createdAt": "2017-11-14T21:35:00Z",
      "modifiedAt": "2018-02-17T16:37:44Z",
      "cells": [
        {
          "columnId": 123
        }
      ]
    }
  ],
  "version": 2
}
```

## Update Rows - Invalid - Assign Hyperlink and Cell Link

Attempts to assign both a hyperlink and cell link to a cell

### Expected Request

#### PUT - /sheets/1/rows

#### Headers

* Content-Type: application/json

#### Body

```json
[
  {
    "id": 10,
    "cells": [
      {
        "columnId": 101,
        "value": "",
        "linkInFromCell": {
          "sheetId": 2,
          "rowId": 20,
          "columnId": 201
        },
        "hyperlink": {
          "url": "www.google.com"
        }
      }
    ]
  }
]
```

### Response

#### Status - 400 Bad Request

```json
{
  "errorCode": 1109,
  "message": "Only one of cell.hyperlink or cell.linkInFromCell may be non-null.",
  "refId": "4ns6urv44dgrw",
  "detail": {
    "index": 0,
    "rowId": 10
  }
}
```

## Update Rows - Location - Top

Move rows containing cells with string values to the top. Returns a valid response with a list of rows.

### Expected Request

#### PUT - /sheets/1/rows

#### Headers

* Content-Type: application/json

#### Body

```json
[
  {
    "id": 10,
    "toTop": true
  }
]
```

### Response

#### Status - 200 OK

```json
{
  "message": "SUCCESS",
  "resultCode": 0,
  "result": [
    {
      "id": 10,
      "rowNumber": 1,
      "expanded": true,
      "createdAt": "2017-10-17T23:16:08Z",
      "modifiedAt": "2017-10-17T23:20:18Z",
      "cells": [
        {
          "columnId": 101,
          "value": "Apple",
          "displayValue": "Apple"
        },
        {
          "columnId": 102,
          "value": "Red Fruit",
          "displayValue": "Red Fruit"
        }
      ]
    }
  ],
  "version": 14
}
```

## Update Rows - Location - Bottom

Moves rows containing cells with string values to the bottom. Returns a valid response with a list of rows.

### Expected Request

#### PUT - /sheets/1/rows

#### Headers

* Content-Type: application/json

#### Body

```json
[
  {
    "id": 10,
    "toBottom": true
  }
]
```

### Response

#### Status - 200 OK

```json
{
  "message": "SUCCESS",
  "resultCode": 0,
  "result": [
    {
      "id": 10,
      "rowNumber": 100,
      "expanded": true,
      "createdAt": "2017-10-17T23:16:08Z",
      "modifiedAt": "2017-10-17T23:20:18Z",
      "cells": [
        {
          "columnId": 101,
          "value": "Apple",
          "displayValue": "Apple"
        },
        {
          "columnId": 102,
          "value": "Red Fruit",
          "displayValue": "Red Fruit"
        }
      ]
    }
  ],
  "version": 14
}
```

## List Sheets - No Params

Gets a list of sheets without query parameters. Returns a valid response with a list of sheets.

### Expected Request

#### GET - /sheets

### Response

#### Status - 200 OK

```json
{
  "pageNumber": 1,
  "pageSize": 100,
  "totalPages": 1,
  "totalCount": 2,
  "data": [
    {
      "id": 1,
      "name": "Copy of Sample Sheet",
      "accessLevel": "OWNER",
      "permalink": "https://app.smartsheet.com/b/home?lx=*****************",
      "createdAt": "2017-10-09T01:54:15Z",
      "modifiedAt": "2017-10-09T01:54:15Z"
    },
    {
      "id": 2,
      "name": "Task Tracking Document",
      "accessLevel": "EDITOR_SHARE",
      "permalink": "https://app.smartsheet.com/b/home?lx=*****************",
      "createdAt": "2017-09-21T18:36:23Z",
      "modifiedAt": "2017-10-17T22:30:57Z"
    }
  ]
}
```

## List Sheets - Include Owner Info

Gets a list of sheets with a owner info query parameters. Returns a valid response with a list of sheets.

### Expected Request

#### GET - /sheets

#### Query Parameters

* include: ownerInfo

### Response

#### Status - 200 OK

```json
{
  "pageNumber": 1,
  "pageSize": 100,
  "totalPages": 1,
  "totalCount": 2,
  "data": [
    {
      "id": 1,
      "name": "Copy of Sample Sheet",
      "accessLevel": "OWNER",
      "owner": "john.doe@smartsheet.com",
      "ownerId": 10,
      "permalink": "https://app.smartsheet.com/b/home?lx=*****************",
      "createdAt": "2017-10-09T01:54:15Z",
      "modifiedAt": "2017-10-09T01:54:15Z"
    },
    {
      "id": 2,
      "name": "Task Tracking Document",
      "accessLevel": "EDITOR_SHARE",
      "owner": "john.doe@smartsheet.com",
      "ownerId": 10,
      "permalink": "https://app.smartsheet.com/b/home?lx=*****************",
      "createdAt": "2017-09-21T18:36:23Z",
      "modifiedAt": "2017-10-17T22:30:57Z"
    }
  ]
}
```

## Create Sheet - Invalid - No Columns

Creates a new sheet without providing column details. Returns a bad request failure response.

### Expected Request

#### POST - /sheets

#### Headers

* Content-Type: application/json

#### Body

```json
{
  "name": "New Sheet",
  "columns": []
}
```

### Response

#### Status - 400 Bad Request

```json
{
  "errorCode": 1054,
  "message": "The new sheet requires either a fromId or columns.",
  "refId": "123abc"
}
```

## List Sights



### Expected Request

#### GET - /sights

### Response

#### Status - 200 OK

```json
{
  "pageNumber": 1,
  "pageSize": 100,
  "totalPages": 1,
  "totalCount": 6,
  "data": [
    {
      "id": 52,
      "name": "My New Sight",
      "accessLevel": "OWNER",
      "permalink": "https://app.smartsheet.com/b/home",
      "createdAt": "2016-08-14T23:45:06Z",
      "modifiedAt": "2017-12-07T19:26:00Z"
    },
    {
      "id": 332,
      "name": "My new Sight",
      "accessLevel": "OWNER",
      "permalink": "https://app.smartsheet.com/b/home",
      "createdAt": "2016-08-14T23:39:11Z",
      "modifiedAt": "2016-08-14T23:39:11Z"
    },
    {
      "id": 84,
      "name": "My new Sight",
      "accessLevel": "OWNER",
      "permalink": "https://app.smartsheet.com/b/home",
      "createdAt": "2016-08-14T23:34:12Z",
      "modifiedAt": "2016-08-14T23:34:12Z"
    },
    {
      "id": 964,
      "name": "My new Sight",
      "accessLevel": "OWNER",
      "permalink": "https://app.smartsheet.com/b/home",
      "createdAt": "2016-08-14T23:26:23Z",
      "modifiedAt": "2016-08-14T23:26:23Z"
    },
    {
      "id": 708,
      "name": "My new Sight Google",
      "accessLevel": "OWNER",
      "permalink": "https://app.smartsheet.com/b/home",
      "createdAt": "2016-08-14T23:32:29Z",
      "modifiedAt": "2016-08-14T23:32:29Z"
    },
    {
      "id": 212,
      "name": "Sight Test",
      "accessLevel": "OWNER",
      "permalink": "https://app.smartsheet.com/b/home",
      "createdAt": "2016-08-08T16:43:55Z",
      "modifiedAt": "2016-08-14T22:58:15Z"
    }
  ]
}
```

## Get Sight



### Expected Request

#### GET - /sights/52

### Response

#### Status - 200 OK

```json
{
  "id": 52,
  "name": "My New Sight",
  "accessLevel": "OWNER",
  "backgroundColor": "#E2E2E2",
  "columnCount": 6,
  "widgets": [
    {
      "id": 484,
      "type": "SHORTCUTLIST",
      "contents": {
        "shortcutData": [
          {
            "label": "Starbucks Stores By State",
            "labelFormat": ",2,,,,,1,,1,,,,,,,",
            "hyperlink": {
              "url": "https://app.smartsheet.com/b/home",
              "sheetId": 500
            },
            "attachmentType": "SMARTSHEET",
            "order": 0
          }
        ]
      },
      "xPosition": 0,
      "yPosition": 1,
      "width": 1,
      "height": 1,
      "showTitleIcon": false,
      "showTitle": true,
      "titleFormat": ",,1,,,,,,,3,,,,,,1",
      "version": 1
    },
    {
      "id": 364,
      "type": "SHEETSUMMARY",
      "contents": {
        "cellData": [
          {
            "columnId": 236,
            "label": "Millimetres",
            "labelFormat": ",2,,,,,,,1,,,,,,,1",
            "valueFormat": ",2,1,,,,1,,1,3,,,,,,1",
            "order": 4,
            "cell": {
              "columnId": 236,
              "value": 958,
              "objectValue": 958,
              "displayValue": "958"
            },
            "objectValue": 958
          },
          {
            "columnId": 492,
            "label": "State",
            "labelFormat": ",2,,,,,,,1,,,,,,,1",
            "valueFormat": ",2,1,,,,1,,1,3,,,,,,1",
            "order": 1,
            "cell": {
              "columnId": 492,
              "value": "Washington",
              "objectValue": "Washington",
              "displayValue": "Washington"
            },
            "objectValue": "Washington"
          },
          {
            "columnId": 612,
            "label": "City",
            "labelFormat": ",2,,,,,,,1,,,,,,,1",
            "valueFormat": ",2,1,,,,1,,1,3,,,,,,1",
            "order": 0,
            "cell": {
              "columnId": 612,
              "value": "Seattle",
              "objectValue": "Seattle",
              "displayValue": "Seattle"
            },
            "objectValue": "Seattle"
          },
          {
            "columnId": 740,
            "label": "Inches",
            "labelFormat": ",2,,,,,,,1,,,,,,,1",
            "valueFormat": ",2,1,,,,1,,1,3,,,,,,1",
            "order": 3,
            "cell": {
              "columnId": 740,
              "value": 37.7,
              "objectValue": 37.7,
              "displayValue": "37.7"
            },
            "objectValue": 37.7
          },
          {
            "columnId": 988,
            "label": "Days",
            "labelFormat": ",2,,,,,,,1,,,,,,,1",
            "valueFormat": ",2,1,,,,1,,1,3,,,,,,1",
            "order": 2,
            "cell": {
              "columnId": 988,
              "value": 149,
              "objectValue": 149,
              "displayValue": "149"
            },
            "objectValue": 149
          }
        ],
        "columns": [
          {
            "id": 612,
            "index": 0,
            "title": "City",
            "type": "TEXT_NUMBER",
            "primary": true,
            "validation": false,
            "width": 150
          },
          {
            "id": 492,
            "index": 1,
            "title": "State",
            "type": "TEXT_NUMBER",
            "validation": false,
            "width": 150
          },
          {
            "id": 988,
            "index": 2,
            "title": "Days",
            "type": "TEXT_NUMBER",
            "validation": false,
            "width": 150
          },
          {
            "id": 740,
            "index": 3,
            "title": "Inches",
            "type": "TEXT_NUMBER",
            "validation": false,
            "width": 150
          },
          {
            "id": 236,
            "index": 4,
            "title": "Millimetres",
            "type": "TEXT_NUMBER",
            "validation": false,
            "width": 150
          }
        ],
        "gridID": 10624640
      },
      "xPosition": 1,
      "yPosition": 1,
      "width": 1,
      "height": 3,
      "title": "Annual Averages for Total Precipitation By City",
      "showTitleIcon": true,
      "showTitle": true,
      "titleFormat": ",,1,,,,,,,3,,,,,,1",
      "version": 1
    },
    {
      "id": 860,
      "type": "RICHTEXT",
      "contents": {
        "htmlContent": "<p>This is a&nbsp;<span class=\"clsDbFt\" style=\"font-family:'arial';font-size:10pt;font-weight:bold;font-style:normal;text-decoration:none;color:rgb( 0 , 0 , 0 );background-color:rgb( 255 , 255 , 255 )\">rich</span><span class=\"clsDbFt\" style=\"font-family:'arial';font-size:10pt;font-weight:normal;font-style:italic;text-decoration:none;color:rgb( 0 , 0 , 0 );background-color:rgb( 255 , 255 , 255 )\">text&nbsp;</span><span class=\"clsDbFt\" style=\"font-family:'arial';font-size:10pt;font-weight:normal;font-style:normal;text-decoration:none;color:rgb( 0 , 0 , 0 );background-color:rgb( 255 , 255 , 255 )\">test</span></p>"
      },
      "xPosition": 2,
      "yPosition": 1,
      "width": 2,
      "height": 4,
      "showTitleIcon": false,
      "showTitle": false,
      "version": 1
    },
    {
      "id": 612,
      "type": "IMAGE",
      "contents": {
        "privateId": "TCA",
        "height": 18,
        "width": 18,
        "fileName": "info_tip_16x16.png",
        "format": ",7,1,,,,2,2,1,3,,,,,,1"
      },
      "xPosition": 4,
      "yPosition": 1,
      "width": 1,
      "height": 4,
      "showTitleIcon": false,
      "showTitle": false,
      "version": 1
    },
    {
      "id": 108,
      "type": "GRIDGANTT",
      "contents": {
        "htmlContent": "<style type=\"text/css\">"
      },
      "xPosition": 0,
      "yPosition": 5,
      "width": 4,
      "height": 6,
      "showTitleIcon": false,
      "showTitle": false,
      "version": 1
    },
    {
      "id": 540,
      "type": "TITLE",
      "contents": {
        "htmlContent": "<p style=\"text-align:center\"><span class=\"clsDbFt\">This is my title</span></p>",
        "backgroundColor": "#F7F7F7"
      },
      "xPosition": 0,
      "yPosition": 0,
      "width": 3,
      "height": 1,
      "showTitleIcon": false,
      "showTitle": false,
      "version": 1
    },
    {
      "id": 852,
      "type": "SHEETSUMMARY",
      "contents": {
        "hyperlink": {
          "url": "http://www.somesite.com"
        },
        "cellData": [
          {
            "columnId": 788,
            "label": "Population (July 1, 2013)",
            "labelFormat": ",2,,,,,,,1,,,,,,,1",
            "valueFormat": ",2,1,,,,1,,1,3,,,,,,1",
            "order": 0,
            "cell": {
              "columnId": 788,
              "value": 6971406,
              "objectValue": 6971406,
              "displayValue": "6971406"
            },
            "objectValue": 6971406
          }
        ],
        "columns": [
          {
            "id": 788,
            "index": 2,
            "title": "Population (July 1, 2013)",
            "type": "TEXT_NUMBER",
            "validation": false,
            "width": 150
          }
        ],
        "gridID": 10624332
      },
      "xPosition": 4,
      "yPosition": 5,
      "width": 1,
      "height": 2,
      "title": "Starbucks Stores By State",
      "showTitleIcon": true,
      "showTitle": true,
      "titleFormat": ",,1,,,,,,,3,,,,,,1",
      "version": 1
    }
  ]
}
```

## Copy Sight



### Expected Request

#### POST - /sights/52/copy

#### Headers

* Content-Type: application/json

#### Body

```json
{
  "destinationId": 484,
  "destinationType": "folder",
  "newName": "new sight"
}
```

### Response

#### Status - 200 OK

```json
{
  "message": "SUCCESS",
  "resultCode": 0,
  "result": {
    "id": 220,
    "name": "new sight",
    "accessLevel": "OWNER",
    "permalink": "https://app.smartsheet.com/b/home"
  }
}
```

## Update Sight



### Expected Request

#### PUT - /sights/812

#### Headers

* Content-Type: application/json

#### Body

```json
{
  "name": "new new sight"
}
```

### Response

#### Status - 200 OK

```json
{
  "message": "SUCCESS",
  "resultCode": 0,
  "result": {
    "id": 812,
    "name": "new new sight",
    "accessLevel": "OWNER",
    "backgroundColor": "#E2E2E2",
    "columnCount": 6,
    "widgets": [
      {
        "id": 556,
        "type": "SHORTCUTLIST",
        "contents": {
          "shortcutData": [
            {
              "label": "Starbucks Stores By State",
              "labelFormat": ",2,,,,,1,,1,,,,,,,",
              "hyperlink": {
                "url": "https://app.smartsheet.com/b/home",
                "sheetId": 500
              },
              "attachmentType": "SMARTSHEET",
              "order": 0
            }
          ]
        },
        "xPosition": 0,
        "yPosition": 1,
        "width": 1,
        "height": 1,
        "showTitleIcon": false,
        "showTitle": true,
        "titleFormat": ",,1,,,,,,,3,,,,,,1",
        "version": 1
      },
      {
        "id": 500,
        "type": "SHEETSUMMARY",
        "contents": {
          "cellData": [
            {
              "columnId": 236,
              "label": "Millimetres",
              "labelFormat": ",2,,,,,,,1,,,,,,,1",
              "valueFormat": ",2,1,,,,1,,1,3,,,,,,1",
              "order": 4,
              "cell": {
                "columnId": 236,
                "value": 958,
                "objectValue": 958,
                "displayValue": "958"
              },
              "objectValue": 958
            },
            {
              "columnId": 492,
              "label": "State",
              "labelFormat": ",2,,,,,,,1,,,,,,,1",
              "valueFormat": ",2,1,,,,1,,1,3,,,,,,1",
              "order": 1,
              "cell": {
                "columnId": 492,
                "value": "Washington",
                "objectValue": "Washington",
                "displayValue": "Washington"
              },
              "objectValue": "Washington"
            },
            {
              "columnId": 612,
              "label": "City",
              "labelFormat": ",2,,,,,,,1,,,,,,,1",
              "valueFormat": ",2,1,,,,1,,1,3,,,,,,1",
              "order": 0,
              "cell": {
                "columnId": 612,
                "value": "Seattle",
                "objectValue": "Seattle",
                "displayValue": "Seattle"
              },
              "objectValue": "Seattle"
            },
            {
              "columnId": 740,
              "label": "Inches",
              "labelFormat": ",2,,,,,,,1,,,,,,,1",
              "valueFormat": ",2,1,,,,1,,1,3,,,,,,1",
              "order": 3,
              "cell": {
                "columnId": 740,
                "value": 37.7,
                "objectValue": 37.7,
                "displayValue": "37.7"
              },
              "objectValue": 37.7
            },
            {
              "columnId": 988,
              "label": "Days",
              "labelFormat": ",2,,,,,,,1,,,,,,,1",
              "valueFormat": ",2,1,,,,1,,1,3,,,,,,1",
              "order": 2,
              "cell": {
                "columnId": 988,
                "value": 149,
                "objectValue": 149,
                "displayValue": "149"
              },
              "objectValue": 149
            }
          ],
          "columns": [
            {
              "id": 612,
              "index": 0,
              "title": "City",
              "type": "TEXT_NUMBER",
              "primary": true,
              "validation": false,
              "width": 150
            },
            {
              "id": 492,
              "index": 1,
              "title": "State",
              "type": "TEXT_NUMBER",
              "validation": false,
              "width": 150
            },
            {
              "id": 988,
              "index": 2,
              "title": "Days",
              "type": "TEXT_NUMBER",
              "validation": false,
              "width": 150
            },
            {
              "id": 740,
              "index": 3,
              "title": "Inches",
              "type": "TEXT_NUMBER",
              "validation": false,
              "width": 150
            },
            {
              "id": 236,
              "index": 4,
              "title": "Millimetres",
              "type": "TEXT_NUMBER",
              "validation": false,
              "width": 150
            }
          ],
          "gridID": 10624640
        },
        "xPosition": 1,
        "yPosition": 1,
        "width": 1,
        "height": 3,
        "title": "Annual Averages for Total Precipitation By City",
        "showTitleIcon": true,
        "showTitle": true,
        "titleFormat": ",,1,,,,,,,3,,,,,,1",
        "version": 1
      },
      {
        "id": 5371172654212996,
        "type": "RICHTEXT",
        "contents": {
          "htmlContent": "<p>This is a&nbsp;<span class=\"clsDbFt\" style=\"font-family:'arial';font-size:10pt;font-weight:bold;font-style:normal;text-decoration:none;color:rgb( 0 , 0 , 0 );background-color:rgb( 255 , 255 , 255 )\">rich</span><span class=\"clsDbFt\" style=\"font-family:'arial';font-size:10pt;font-weight:normal;font-style:italic;text-decoration:none;color:rgb( 0 , 0 , 0 );background-color:rgb( 255 , 255 , 255 )\">text&nbsp;</span><span class=\"clsDbFt\" style=\"font-family:'arial';font-size:10pt;font-weight:normal;font-style:normal;text-decoration:none;color:rgb( 0 , 0 , 0 );background-color:rgb( 255 , 255 , 255 )\">test</span></p>"
        },
        "xPosition": 2,
        "yPosition": 1,
        "width": 2,
        "height": 4,
        "showTitleIcon": false,
        "showTitle": false,
        "version": 1
      },
      {
        "id": 748,
        "type": "IMAGE",
        "contents": {
          "privateId": "TCA",
          "height": 18,
          "width": 18,
          "fileName": "info_tip_16x16.png",
          "format": ",7,1,,,,2,2,1,3,,,,,,1"
        },
        "xPosition": 4,
        "yPosition": 1,
        "width": 1,
        "height": 4,
        "showTitleIcon": false,
        "showTitle": false,
        "version": 1
      },
      {
        "id": 244,
        "type": "GRIDGANTT",
        "contents": {
          "htmlContent": "<style type=\"text/css\">"
        },
        "xPosition": 0,
        "yPosition": 5,
        "width": 4,
        "height": 6,
        "showTitleIcon": false,
        "showTitle": false,
        "version": 1
      },
      {
        "id": 124,
        "type": "TITLE",
        "contents": {
          "htmlContent": "<p style=\"text-align:center\"><span class=\"clsDbFt\">This is my title</span></p>",
          "backgroundColor": "#F7F7F7"
        },
        "xPosition": 0,
        "yPosition": 0,
        "width": 3,
        "height": 1,
        "showTitleIcon": false,
        "showTitle": false,
        "version": 1
      },
      {
        "id": 620,
        "type": "SHEETSUMMARY",
        "contents": {
          "hyperlink": {
            "url": "http://www.somesite.com"
          },
          "cellData": [
            {
              "columnId": 788,
              "label": "Population (July 1, 2013)",
              "labelFormat": ",2,,,,,,,1,,,,,,,1",
              "valueFormat": ",2,1,,,,1,,1,3,,,,,,1",
              "order": 0,
              "cell": {
                "columnId": 788,
                "value": 6971406,
                "objectValue": 6971406,
                "displayValue": "6971406"
              },
              "objectValue": 6971406
            }
          ],
          "columns": [
            {
              "id": 788,
              "index": 2,
              "title": "Population (July 1, 2013)",
              "type": "TEXT_NUMBER",
              "validation": false,
              "width": 150
            }
          ],
          "gridID": 10624332
        },
        "xPosition": 4,
        "yPosition": 5,
        "width": 1,
        "height": 2,
        "title": "Starbucks Stores By State",
        "showTitleIcon": true,
        "showTitle": true,
        "titleFormat": ",,1,,,,,,,3,,,,,,1",
        "version": 1
      }
    ]
  }
}
```

## Set Sight Publish Status



### Expected Request

#### PUT - /sights/812/publish

#### Headers

* Content-Type: application/json

#### Body

```json
{
  "readOnlyFullAccessibleBy": "ALL",
  "readOnlyFullEnabled": true
}
```

### Response

#### Status - 200 OK

```json
{
  "message": "SUCCESS",
  "resultCode": 0,
  "result": {
    "readOnlyFullEnabled": true,
    "readOnlyFullAccessibleBy": "ALL",
    "readOnlyFullUrl": "https://app.smartsheet.com/b/publish"
  }
}
```

## Get Sight Publish Status



### Expected Request

#### GET - /sights/812/publish

### Response

#### Status - 200 OK

```json
{
  "readOnlyFullEnabled": true,
  "readOnlyFullAccessibleBy": "ALL",
  "readOnlyFullUrl": "https://app.smartsheet.com/b/publish"
}
```

## Delete Sight



### Expected Request

#### DELETE - /sights/700

### Response

#### Status - 200 OK

```json
{
  "message": "SUCCESS",
  "resultCode": 0
}
```
