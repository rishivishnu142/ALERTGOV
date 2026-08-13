# Oracle Database Schema Documentation

This document contains a highly detailed breakdown of the ALERT 4.0 GOVERNMENT system's database schema running on Oracle Database. The system follows a Microservices Architecture. The schema definitions are auto-generated and maintained using Spring Data JPA and Hibernate. Below are the precise `CREATE TABLE` Oracle SQL statements matching the application's entity structures, along with descriptions of their purpose and data stored.

## Table: `ai_predictions`

**Service / Module**: ai-service

**Entity Class**: `AiPrediction`

**Description**: This table is responsible for storing data related to `AiPrediction` within the ai-service. It maintains the primary records essential for system operations such as logging, referencing, and state management.

### Oracle SQL Creation Script

```sql
CREATE TABLE ai_predictions (
    PREDICTIONID VARCHAR2(255),
    INCIDENTID VARCHAR2(255),
    PREDICTEDSEVERITY VARCHAR2(255),
    SPREADRADIUSKM VARCHAR2(255),
    RECOMMENDATIONS VARCHAR2(255),
    GENERATEDAT TIMESTAMP
);
```

### Columns and Data Types

| Column Name | Oracle Data Type | Java Type | Description |
|---|---|---|---|
| `PREDICTIONID` | `VARCHAR2(255)` | `String` | Stores the predictionId information for AiPrediction. |
| `INCIDENTID` | `VARCHAR2(255)` | `String` | Stores the incidentId information for AiPrediction. |
| `PREDICTEDSEVERITY` | `VARCHAR2(255)` | `String` | Stores the predictedSeverity information for AiPrediction. |
| `SPREADRADIUSKM` | `VARCHAR2(255)` | `String` | Stores the spreadRadiusKm information for AiPrediction. |
| `RECOMMENDATIONS` | `VARCHAR2(255)` | `String` | Stores the recommendations information for AiPrediction. |
| `GENERATEDAT` | `TIMESTAMP` | `LocalDateTime` | Stores the generatedAt information for AiPrediction. |

---

## Table: `alerts`

**Service / Module**: alert-service

**Entity Class**: `Alert`

**Description**: This table is responsible for storing data related to `Alert` within the alert-service. It maintains the primary records essential for system operations such as logging, referencing, and state management.

### Oracle SQL Creation Script

```sql
CREATE TABLE alerts (
    ALERTID VARCHAR2(255),
    SENDERID VARCHAR2(255),
    TITLE VARCHAR2(255),
    DESCRIPTION VARCHAR2(255),
    SEVERITY VARCHAR2(255),
    STATUS VARCHAR2(255),
    TARGETDISTRICT VARCHAR2(255),
    TARGETTALUK VARCHAR2(255),
    INCIDENTID VARCHAR2(255),
    CREATEDAT TIMESTAMP,
    VALIDUNTIL TIMESTAMP
);
```

### Columns and Data Types

| Column Name | Oracle Data Type | Java Type | Description |
|---|---|---|---|
| `ALERTID` | `VARCHAR2(255)` | `String` | Stores the alertId information for Alert. |
| `SENDERID` | `VARCHAR2(255)` | `String` | Stores the senderId information for Alert. |
| `TITLE` | `VARCHAR2(255)` | `String` | Stores the title information for Alert. |
| `DESCRIPTION` | `VARCHAR2(255)` | `String` | Stores the description information for Alert. |
| `SEVERITY` | `VARCHAR2(255)` | `String` | Stores the severity information for Alert. |
| `STATUS` | `VARCHAR2(255)` | `String` | Stores the status information for Alert. |
| `TARGETDISTRICT` | `VARCHAR2(255)` | `String` | Stores the targetDistrict information for Alert. |
| `TARGETTALUK` | `VARCHAR2(255)` | `String` | Stores the targetTaluk information for Alert. |
| `INCIDENTID` | `VARCHAR2(255)` | `String` | Stores the incidentId information for Alert. |
| `CREATEDAT` | `TIMESTAMP` | `LocalDateTime` | Stores the createdAt information for Alert. |
| `VALIDUNTIL` | `TIMESTAMP` | `LocalDateTime` | Stores the validUntil information for Alert. |

---

## Table: `analytics_snapshots`

**Service / Module**: analytics-service

**Entity Class**: `AnalyticsSnapshot`

**Description**: This table is responsible for storing data related to `AnalyticsSnapshot` within the analytics-service. It maintains the primary records essential for system operations such as logging, referencing, and state management.

### Oracle SQL Creation Script

```sql
CREATE TABLE analytics_snapshots (
    SNAPSHOTID VARCHAR2(255),
    SNAPSHOTDATE VARCHAR2(255),
    TOTALACTIVEINCIDENTS NUMBER(10,0),
    TOTALALERTSSENT NUMBER(10,0),
    TOTALPENDINGAPPROVALS NUMBER(10,0),
    TOPAFFECTEDDISTRICT VARCHAR2(255)
);
```

### Columns and Data Types

| Column Name | Oracle Data Type | Java Type | Description |
|---|---|---|---|
| `SNAPSHOTID` | `VARCHAR2(255)` | `String` | Stores the snapshotId information for AnalyticsSnapshot. |
| `SNAPSHOTDATE` | `VARCHAR2(255)` | `LocalDate` | Stores the snapshotDate information for AnalyticsSnapshot. |
| `TOTALACTIVEINCIDENTS` | `NUMBER(10,0)` | `int` | Stores the totalActiveIncidents information for AnalyticsSnapshot. |
| `TOTALALERTSSENT` | `NUMBER(10,0)` | `int` | Stores the totalAlertsSent information for AnalyticsSnapshot. |
| `TOTALPENDINGAPPROVALS` | `NUMBER(10,0)` | `int` | Stores the totalPendingApprovals information for AnalyticsSnapshot. |
| `TOPAFFECTEDDISTRICT` | `VARCHAR2(255)` | `String` | Stores the topAffectedDistrict information for AnalyticsSnapshot. |

---

## Table: `approval_workflows`

**Service / Module**: approval-service

**Entity Class**: `ApprovalWorkflow`

**Description**: This table is responsible for storing data related to `ApprovalWorkflow` within the approval-service. It maintains the primary records essential for system operations such as logging, referencing, and state management.

### Oracle SQL Creation Script

```sql
CREATE TABLE approval_workflows (
    APPROVALID VARCHAR2(255),
    INCIDENTID VARCHAR2(255),
    ASSIGNEDCOLLECTORID VARCHAR2(255),
    STATUS VARCHAR2(255),
    COMMENTS VARCHAR2(255),
    CREATEDAT TIMESTAMP,
    UPDATEDAT TIMESTAMP
);
```

### Columns and Data Types

| Column Name | Oracle Data Type | Java Type | Description |
|---|---|---|---|
| `APPROVALID` | `VARCHAR2(255)` | `String` | Stores the approvalId information for ApprovalWorkflow. |
| `INCIDENTID` | `VARCHAR2(255)` | `String` | Stores the incidentId information for ApprovalWorkflow. |
| `ASSIGNEDCOLLECTORID` | `VARCHAR2(255)` | `String` | Stores the assignedCollectorId information for ApprovalWorkflow. |
| `STATUS` | `VARCHAR2(255)` | `String` | Stores the status information for ApprovalWorkflow. |
| `COMMENTS` | `VARCHAR2(255)` | `String` | Stores the comments information for ApprovalWorkflow. |
| `CREATEDAT` | `TIMESTAMP` | `LocalDateTime` | Stores the createdAt information for ApprovalWorkflow. |
| `UPDATEDAT` | `TIMESTAMP` | `LocalDateTime` | Stores the updatedAt information for ApprovalWorkflow. |

---

## Table: `auth_users`

**Service / Module**: auth-service

**Entity Class**: `AuthUser`

**Description**: This table is responsible for storing data related to `AuthUser` within the auth-service. It maintains the primary records essential for system operations such as logging, referencing, and state management.

### Oracle SQL Creation Script

```sql
CREATE TABLE auth_users (
    USERNAME VARCHAR2(255) PRIMARY KEY,
    PASSWORD VARCHAR2(255),
    ROLE VARCHAR2(255)
);
```

### Columns and Data Types

| Column Name | Oracle Data Type | Java Type | Description |
|---|---|---|---|
| `USERNAME` | `VARCHAR2(255)` | `String` | Stores the username information for AuthUser. |
| `PASSWORD` | `VARCHAR2(255)` | `String` | Stores the password information for AuthUser. |
| `ROLE` | `VARCHAR2(255)` | `String` | Stores the role information for AuthUser. |

---

## Table: `incident_reports`

**Service / Module**: incident-service

**Entity Class**: `IncidentReport`

**Description**: This table is responsible for storing data related to `IncidentReport` within the incident-service. It maintains the primary records essential for system operations such as logging, referencing, and state management.

### Oracle SQL Creation Script

```sql
CREATE TABLE incident_reports (
    ID VARCHAR2(255) PRIMARY KEY,
    TITLE VARCHAR2(255),
    CATEGORY VARCHAR2(255),
    SEVERITY VARCHAR2(255),
    STATUS VARCHAR2(255),
    LEVEL VARCHAR2(255),
    DISTRICT VARCHAR2(255),
    TALUK VARCHAR2(255),
    VILLAGE VARCHAR2(255),
    DESCRIPTION VARCHAR2(255),
    REPORTEDBY VARCHAR2(255),
    DATE TIMESTAMP,
    MEDIAIDS VARCHAR2(255),
    UPDATES VARCHAR2(255),
    AISUMMARY VARCHAR2(255),
    AIRECOMMENDATION VARCHAR2(255),
    PHOTOBASE64 VARCHAR2(255)
);
```

### Columns and Data Types

| Column Name | Oracle Data Type | Java Type | Description |
|---|---|---|---|
| `ID` | `VARCHAR2(255)` | `String` | Stores the id information for IncidentReport. |
| `TITLE` | `VARCHAR2(255)` | `String` | Stores the title information for IncidentReport. |
| `CATEGORY` | `VARCHAR2(255)` | `String` | Stores the category information for IncidentReport. |
| `SEVERITY` | `VARCHAR2(255)` | `String` | Stores the severity information for IncidentReport. |
| `STATUS` | `VARCHAR2(255)` | `String` | Stores the status information for IncidentReport. |
| `LEVEL` | `VARCHAR2(255)` | `String` | Stores the level information for IncidentReport. |
| `DISTRICT` | `VARCHAR2(255)` | `String` | Stores the district information for IncidentReport. |
| `TALUK` | `VARCHAR2(255)` | `String` | Stores the taluk information for IncidentReport. |
| `VILLAGE` | `VARCHAR2(255)` | `String` | Stores the village information for IncidentReport. |
| `DESCRIPTION` | `VARCHAR2(255)` | `String` | Stores the description information for IncidentReport. |
| `REPORTEDBY` | `VARCHAR2(255)` | `String` | Stores the reportedBy information for IncidentReport. |
| `DATE` | `TIMESTAMP` | `LocalDateTime` | Stores the date information for IncidentReport. |
| `MEDIAIDS` | `VARCHAR2(255)` | `List<String>` | Stores the mediaIds information for IncidentReport. |
| `UPDATES` | `VARCHAR2(255)` | `List<String>` | Stores the updates information for IncidentReport. |
| `AISUMMARY` | `VARCHAR2(255)` | `String` | Stores the aiSummary information for IncidentReport. |
| `AIRECOMMENDATION` | `VARCHAR2(255)` | `String` | Stores the aiRecommendation information for IncidentReport. |
| `PHOTOBASE64` | `VARCHAR2(255)` | `String` | Stores the photoBase64 information for IncidentReport. |

---

## Table: `AG_AI_MODEL_REGISTRYS`

**Service / Module**: monolith-legacy

**Entity Class**: `AiModelRegistry`

**Description**: This table is responsible for storing data related to `AiModelRegistry` within the monolith-legacy. It maintains the primary records essential for system operations such as logging, referencing, and state management.

### Oracle SQL Creation Script

```sql
CREATE TABLE AG_AI_MODEL_REGISTRYS (
    MODELID NUMBER(19,0)
);
```

### Columns and Data Types

| Column Name | Oracle Data Type | Java Type | Description |
|---|---|---|---|
| `MODELID` | `NUMBER(19,0)` | `Long` | Stores the modelId information for AiModelRegistry. |

---

## Table: `AG_AI_PREDICTIONS`

**Service / Module**: monolith-legacy

**Entity Class**: `AiPrediction`

**Description**: This table is responsible for storing data related to `AiPrediction` within the monolith-legacy. It maintains the primary records essential for system operations such as logging, referencing, and state management.

### Oracle SQL Creation Script

```sql
CREATE TABLE AG_AI_PREDICTIONS (
    PREDICTIONID VARCHAR2(255)
);
```

### Columns and Data Types

| Column Name | Oracle Data Type | Java Type | Description |
|---|---|---|---|
| `PREDICTIONID` | `VARCHAR2(255)` | `String` | Stores the predictionId information for AiPrediction. |

---

## Table: `AG_ALERTS`

**Service / Module**: monolith-legacy

**Entity Class**: `Alert`

**Description**: This table is responsible for storing data related to `Alert` within the monolith-legacy. It maintains the primary records essential for system operations such as logging, referencing, and state management.

### Oracle SQL Creation Script

```sql
CREATE TABLE AG_ALERTS (
    ALERTID VARCHAR2(255),
    SENDERID VARCHAR2(255),
    DISASTERTYPEID NUMBER(19,0),
    TITLE VARCHAR2(255),
    DESCRIPTION VARCHAR2(255),
    SEVERITY VARCHAR2(255),
    STATUS VARCHAR2(255),
    TARGETLOCATIONTYPE VARCHAR2(255),
    TARGETLOCATIONID NUMBER(19,0),
    VALIDUNTIL TIMESTAMP
);
```

### Columns and Data Types

| Column Name | Oracle Data Type | Java Type | Description |
|---|---|---|---|
| `ALERTID` | `VARCHAR2(255)` | `String` | Stores the alertId information for Alert. |
| `SENDERID` | `VARCHAR2(255)` | `String` | Stores the senderId information for Alert. |
| `DISASTERTYPEID` | `NUMBER(19,0)` | `Long` | Stores the disasterTypeId information for Alert. |
| `TITLE` | `VARCHAR2(255)` | `String` | Stores the title information for Alert. |
| `DESCRIPTION` | `VARCHAR2(255)` | `String` | Stores the description information for Alert. |
| `SEVERITY` | `VARCHAR2(255)` | `String` | Stores the severity information for Alert. |
| `STATUS` | `VARCHAR2(255)` | `String` | Stores the status information for Alert. |
| `TARGETLOCATIONTYPE` | `VARCHAR2(255)` | `String` | Stores the targetLocationType information for Alert. |
| `TARGETLOCATIONID` | `NUMBER(19,0)` | `Long` | Stores the targetLocationId information for Alert. |
| `VALIDUNTIL` | `TIMESTAMP` | `LocalDateTime` | Stores the validUntil information for Alert. |

---

## Table: `AG_ALERT_LOCATIONS`

**Service / Module**: monolith-legacy

**Entity Class**: `AlertLocation`

**Description**: This table is responsible for storing data related to `AlertLocation` within the monolith-legacy. It maintains the primary records essential for system operations such as logging, referencing, and state management.

### Oracle SQL Creation Script

```sql
CREATE TABLE AG_ALERT_LOCATIONS (
    ALID NUMBER(19,0)
);
```

### Columns and Data Types

| Column Name | Oracle Data Type | Java Type | Description |
|---|---|---|---|
| `ALID` | `NUMBER(19,0)` | `Long` | Stores the alId information for AlertLocation. |

---

## Table: `AG_AUDIT_LOGS`

**Service / Module**: monolith-legacy

**Entity Class**: `AuditLog`

**Description**: This table is responsible for storing data related to `AuditLog` within the monolith-legacy. It maintains the primary records essential for system operations such as logging, referencing, and state management.

### Oracle SQL Creation Script

```sql
CREATE TABLE AG_AUDIT_LOGS (
    LOGID NUMBER(19,0)
);
```

### Columns and Data Types

| Column Name | Oracle Data Type | Java Type | Description |
|---|---|---|---|
| `LOGID` | `NUMBER(19,0)` | `Long` | Stores the logId information for AuditLog. |

---

## Table: `AG_DISASTER_REPORTS`

**Service / Module**: monolith-legacy

**Entity Class**: `DisasterReport`

**Description**: This table is responsible for storing data related to `DisasterReport` within the monolith-legacy. It maintains the primary records essential for system operations such as logging, referencing, and state management.

### Oracle SQL Creation Script

```sql
CREATE TABLE AG_DISASTER_REPORTS (
    REPORTID VARCHAR2(255),
    REPORTERID VARCHAR2(255),
    DISASTERTYPEID NUMBER(19,0),
    DESCRIPTION VARCHAR2(255),
    LATITUDE VARCHAR2(255),
    LONGITUDE VARCHAR2(255),
    VILLAGEID NUMBER(19,0),
    STATUS VARCHAR2(255)
);
```

### Columns and Data Types

| Column Name | Oracle Data Type | Java Type | Description |
|---|---|---|---|
| `REPORTID` | `VARCHAR2(255)` | `String` | Stores the reportId information for DisasterReport. |
| `REPORTERID` | `VARCHAR2(255)` | `String` | Stores the reporterId information for DisasterReport. |
| `DISASTERTYPEID` | `NUMBER(19,0)` | `Long` | Stores the disasterTypeId information for DisasterReport. |
| `DESCRIPTION` | `VARCHAR2(255)` | `String` | Stores the description information for DisasterReport. |
| `LATITUDE` | `VARCHAR2(255)` | `String` | Stores the latitude information for DisasterReport. |
| `LONGITUDE` | `VARCHAR2(255)` | `String` | Stores the longitude information for DisasterReport. |
| `VILLAGEID` | `NUMBER(19,0)` | `Long` | Stores the villageId information for DisasterReport. |
| `STATUS` | `VARCHAR2(255)` | `String` | Stores the status information for DisasterReport. |

---

## Table: `AG_DISASTER_TYPES`

**Service / Module**: monolith-legacy

**Entity Class**: `DisasterType`

**Description**: This table is responsible for storing data related to `DisasterType` within the monolith-legacy. It maintains the primary records essential for system operations such as logging, referencing, and state management.

### Oracle SQL Creation Script

```sql
CREATE TABLE AG_DISASTER_TYPES (
    DISASTERTYPEID NUMBER(19,0)
);
```

### Columns and Data Types

| Column Name | Oracle Data Type | Java Type | Description |
|---|---|---|---|
| `DISASTERTYPEID` | `NUMBER(19,0)` | `Long` | Stores the disasterTypeId information for DisasterType. |

---

## Table: `AG_DISTRICTS`

**Service / Module**: monolith-legacy

**Entity Class**: `District`

**Description**: This table is responsible for storing data related to `District` within the monolith-legacy. It maintains the primary records essential for system operations such as logging, referencing, and state management.

### Oracle SQL Creation Script

```sql
CREATE TABLE AG_DISTRICTS (
    DISTRICTID NUMBER(19,0)
);
```

### Columns and Data Types

| Column Name | Oracle Data Type | Java Type | Description |
|---|---|---|---|
| `DISTRICTID` | `NUMBER(19,0)` | `Long` | Stores the districtId information for District. |

---

## Table: `AG_NOTIFICATIONS`

**Service / Module**: monolith-legacy

**Entity Class**: `Notification`

**Description**: This table is responsible for storing data related to `Notification` within the monolith-legacy. It maintains the primary records essential for system operations such as logging, referencing, and state management.

### Oracle SQL Creation Script

```sql
CREATE TABLE AG_NOTIFICATIONS (
    NOTIFICATIONID NUMBER(19,0),
    USERID VARCHAR2(255),
    ALERTID VARCHAR2(255),
    TITLE VARCHAR2(255),
    MESSAGE VARCHAR2(255),
    STATUS VARCHAR2(255),
    CHANNEL VARCHAR2(255)
);
```

### Columns and Data Types

| Column Name | Oracle Data Type | Java Type | Description |
|---|---|---|---|
| `NOTIFICATIONID` | `NUMBER(19,0)` | `Long` | Stores the notificationId information for Notification. |
| `USERID` | `VARCHAR2(255)` | `String` | Stores the userId information for Notification. |
| `ALERTID` | `VARCHAR2(255)` | `String` | Stores the alertId information for Notification. |
| `TITLE` | `VARCHAR2(255)` | `String` | Stores the title information for Notification. |
| `MESSAGE` | `VARCHAR2(255)` | `String` | Stores the message information for Notification. |
| `STATUS` | `VARCHAR2(255)` | `String` | Stores the status information for Notification. |
| `CHANNEL` | `VARCHAR2(255)` | `String` | Stores the channel information for Notification. |

---

## Table: `AG_NOTIFICATION_TEMPLATES`

**Service / Module**: monolith-legacy

**Entity Class**: `NotificationTemplate`

**Description**: This table is responsible for storing data related to `NotificationTemplate` within the monolith-legacy. It maintains the primary records essential for system operations such as logging, referencing, and state management.

### Oracle SQL Creation Script

```sql
CREATE TABLE AG_NOTIFICATION_TEMPLATES (
    TEMPLATEID NUMBER(19,0)
);
```

### Columns and Data Types

| Column Name | Oracle Data Type | Java Type | Description |
|---|---|---|---|
| `TEMPLATEID` | `NUMBER(19,0)` | `Long` | Stores the templateId information for NotificationTemplate. |

---

## Table: `AG_PERMISSIONS`

**Service / Module**: monolith-legacy

**Entity Class**: `Permission`

**Description**: This table is responsible for storing data related to `Permission` within the monolith-legacy. It maintains the primary records essential for system operations such as logging, referencing, and state management.

### Oracle SQL Creation Script

```sql
CREATE TABLE AG_PERMISSIONS (
    PERMISSIONID NUMBER(19,0)
);
```

### Columns and Data Types

| Column Name | Oracle Data Type | Java Type | Description |
|---|---|---|---|
| `PERMISSIONID` | `NUMBER(19,0)` | `Long` | Stores the permissionId information for Permission. |

---

## Table: `AG_REPORT_IMAGES`

**Service / Module**: monolith-legacy

**Entity Class**: `ReportImage`

**Description**: This table is responsible for storing data related to `ReportImage` within the monolith-legacy. It maintains the primary records essential for system operations such as logging, referencing, and state management.

### Oracle SQL Creation Script

```sql
CREATE TABLE AG_REPORT_IMAGES (
    IMAGEID VARCHAR2(255)
);
```

### Columns and Data Types

| Column Name | Oracle Data Type | Java Type | Description |
|---|---|---|---|
| `IMAGEID` | `VARCHAR2(255)` | `String` | Stores the imageId information for ReportImage. |

---

## Table: `AG_REPORT_STATUS_HISTORYS`

**Service / Module**: monolith-legacy

**Entity Class**: `ReportStatusHistory`

**Description**: This table is responsible for storing data related to `ReportStatusHistory` within the monolith-legacy. It maintains the primary records essential for system operations such as logging, referencing, and state management.

### Oracle SQL Creation Script

```sql
CREATE TABLE AG_REPORT_STATUS_HISTORYS (
    HISTORYID NUMBER(19,0)
);
```

### Columns and Data Types

| Column Name | Oracle Data Type | Java Type | Description |
|---|---|---|---|
| `HISTORYID` | `NUMBER(19,0)` | `Long` | Stores the historyId information for ReportStatusHistory. |

---

## Table: `AG_ROLES`

**Service / Module**: monolith-legacy

**Entity Class**: `Role`

**Description**: This table is responsible for storing data related to `Role` within the monolith-legacy. It maintains the primary records essential for system operations such as logging, referencing, and state management.

### Oracle SQL Creation Script

```sql
CREATE TABLE AG_ROLES (
    ROLEID NUMBER(19,0),
    ROLENAME VARCHAR2(255),
    DESCRIPTION VARCHAR2(255)
);
```

### Columns and Data Types

| Column Name | Oracle Data Type | Java Type | Description |
|---|---|---|---|
| `ROLEID` | `NUMBER(19,0)` | `Long` | Stores the roleId information for Role. |
| `ROLENAME` | `VARCHAR2(255)` | `String` | Stores the roleName information for Role. |
| `DESCRIPTION` | `VARCHAR2(255)` | `String` | Stores the description information for Role. |

---

## Table: `AG_STATES`

**Service / Module**: monolith-legacy

**Entity Class**: `State`

**Description**: This table is responsible for storing data related to `State` within the monolith-legacy. It maintains the primary records essential for system operations such as logging, referencing, and state management.

### Oracle SQL Creation Script

```sql
CREATE TABLE AG_STATES (
    STATEID NUMBER(19,0)
);
```

### Columns and Data Types

| Column Name | Oracle Data Type | Java Type | Description |
|---|---|---|---|
| `STATEID` | `NUMBER(19,0)` | `Long` | Stores the stateId information for State. |

---

## Table: `AG_TALUKS`

**Service / Module**: monolith-legacy

**Entity Class**: `Taluk`

**Description**: This table is responsible for storing data related to `Taluk` within the monolith-legacy. It maintains the primary records essential for system operations such as logging, referencing, and state management.

### Oracle SQL Creation Script

```sql
CREATE TABLE AG_TALUKS (
    TALUKID NUMBER(19,0)
);
```

### Columns and Data Types

| Column Name | Oracle Data Type | Java Type | Description |
|---|---|---|---|
| `TALUKID` | `NUMBER(19,0)` | `Long` | Stores the talukId information for Taluk. |

---

## Table: `AG_USERS`

**Service / Module**: monolith-legacy

**Entity Class**: `User`

**Description**: This table is responsible for storing data related to `User` within the monolith-legacy. It maintains the primary records essential for system operations such as logging, referencing, and state management.

### Oracle SQL Creation Script

```sql
CREATE TABLE AG_USERS (
    USERID VARCHAR2(255),
    EMAIL VARCHAR2(255),
    PASSWORDHASH VARCHAR2(255),
    FULLNAME VARCHAR2(255),
    PHONENUMBER VARCHAR2(255),
    STATUS VARCHAR2(255)
);
```

### Columns and Data Types

| Column Name | Oracle Data Type | Java Type | Description |
|---|---|---|---|
| `USERID` | `VARCHAR2(255)` | `String` | Stores the userId information for User. |
| `EMAIL` | `VARCHAR2(255)` | `String` | Stores the email information for User. |
| `PASSWORDHASH` | `VARCHAR2(255)` | `String` | Stores the passwordHash information for User. |
| `FULLNAME` | `VARCHAR2(255)` | `String` | Stores the fullName information for User. |
| `PHONENUMBER` | `VARCHAR2(255)` | `String` | Stores the phoneNumber information for User. |
| `STATUS` | `VARCHAR2(255)` | `String` | Stores the status information for User. |

---

## Table: `AG_USER_SESSIONS`

**Service / Module**: monolith-legacy

**Entity Class**: `UserSession`

**Description**: This table is responsible for storing data related to `UserSession` within the monolith-legacy. It maintains the primary records essential for system operations such as logging, referencing, and state management.

### Oracle SQL Creation Script

```sql
CREATE TABLE AG_USER_SESSIONS (
    SESSIONID NUMBER(19,0)
);
```

### Columns and Data Types

| Column Name | Oracle Data Type | Java Type | Description |
|---|---|---|---|
| `SESSIONID` | `NUMBER(19,0)` | `Long` | Stores the sessionId information for UserSession. |

---

## Table: `AG_VILLAGES`

**Service / Module**: monolith-legacy

**Entity Class**: `Village`

**Description**: This table is responsible for storing data related to `Village` within the monolith-legacy. It maintains the primary records essential for system operations such as logging, referencing, and state management.

### Oracle SQL Creation Script

```sql
CREATE TABLE AG_VILLAGES (
    VILLAGEID NUMBER(19,0)
);
```

### Columns and Data Types

| Column Name | Oracle Data Type | Java Type | Description |
|---|---|---|---|
| `VILLAGEID` | `NUMBER(19,0)` | `Long` | Stores the villageId information for Village. |

---

## Table: `notifications`

**Service / Module**: notification-service

**Entity Class**: `Notification`

**Description**: This table is responsible for storing data related to `Notification` within the notification-service. It maintains the primary records essential for system operations such as logging, referencing, and state management.

### Oracle SQL Creation Script

```sql
CREATE TABLE notifications (
    NOTIFICATIONID VARCHAR2(255),
    USERID VARCHAR2(255),
    TITLE VARCHAR2(255),
    MESSAGE VARCHAR2(255),
    STATUS VARCHAR2(255),
    CHANNEL VARCHAR2(255),
    CREATEDAT TIMESTAMP
);
```

### Columns and Data Types

| Column Name | Oracle Data Type | Java Type | Description |
|---|---|---|---|
| `NOTIFICATIONID` | `VARCHAR2(255)` | `String` | Stores the notificationId information for Notification. |
| `USERID` | `VARCHAR2(255)` | `String` | Stores the userId information for Notification. |
| `TITLE` | `VARCHAR2(255)` | `String` | Stores the title information for Notification. |
| `MESSAGE` | `VARCHAR2(255)` | `String` | Stores the message information for Notification. |
| `STATUS` | `VARCHAR2(255)` | `String` | Stores the status information for Notification. |
| `CHANNEL` | `VARCHAR2(255)` | `String` | Stores the channel information for Notification. |
| `CREATEDAT` | `TIMESTAMP` | `LocalDateTime` | Stores the createdAt information for Notification. |

---

## Table: `districts`

**Service / Module**: user-service

**Entity Class**: `District`

**Description**: This table is responsible for storing data related to `District` within the user-service. It maintains the primary records essential for system operations such as logging, referencing, and state management.

### Oracle SQL Creation Script

```sql
CREATE TABLE districts (
    NAME VARCHAR2(255),
    TALUKSJSON VARCHAR2(255)
);
```

### Columns and Data Types

| Column Name | Oracle Data Type | Java Type | Description |
|---|---|---|---|
| `NAME` | `VARCHAR2(255)` | `String` | Stores the name information for District. |
| `TALUKSJSON` | `VARCHAR2(255)` | `String` | Stores the taluksJson information for District. |

---

## Table: `employees`

**Service / Module**: user-service

**Entity Class**: `Employee`

**Description**: This table is responsible for storing data related to `Employee` within the user-service. It maintains the primary records essential for system operations such as logging, referencing, and state management.

### Oracle SQL Creation Script

```sql
CREATE TABLE employees (
    USERNAME VARCHAR2(255) PRIMARY KEY,
    NAME VARCHAR2(255),
    TITLE VARCHAR2(255),
    ROLE VARCHAR2(255),
    STATE VARCHAR2(255),
    DISTRICT VARCHAR2(255),
    TALUK VARCHAR2(255),
    VILLAGE VARCHAR2(255)
);
```

### Columns and Data Types

| Column Name | Oracle Data Type | Java Type | Description |
|---|---|---|---|
| `USERNAME` | `VARCHAR2(255)` | `String` | Stores the username information for Employee. |
| `NAME` | `VARCHAR2(255)` | `String` | Stores the name information for Employee. |
| `TITLE` | `VARCHAR2(255)` | `String` | Stores the title information for Employee. |
| `ROLE` | `VARCHAR2(255)` | `String` | Stores the role information for Employee. |
| `STATE` | `VARCHAR2(255)` | `String` | Stores the state information for Employee. |
| `DISTRICT` | `VARCHAR2(255)` | `String` | Stores the district information for Employee. |
| `TALUK` | `VARCHAR2(255)` | `String` | Stores the taluk information for Employee. |
| `VILLAGE` | `VARCHAR2(255)` | `String` | Stores the village information for Employee. |

---

## Table: `resources`

**Service / Module**: user-service

**Entity Class**: `Resource`

**Description**: This table is responsible for storing data related to `Resource` within the user-service. It maintains the primary records essential for system operations such as logging, referencing, and state management.

### Oracle SQL Creation Script

```sql
CREATE TABLE resources (
    ID VARCHAR2(255) PRIMARY KEY,
    NAME VARCHAR2(255),
    TYPE VARCHAR2(255),
    LOCATION VARCHAR2(255),
    STATUS VARCHAR2(255),
    ASSIGNEDTO VARCHAR2(255)
);
```

### Columns and Data Types

| Column Name | Oracle Data Type | Java Type | Description |
|---|---|---|---|
| `ID` | `VARCHAR2(255)` | `String` | Stores the id information for Resource. |
| `NAME` | `VARCHAR2(255)` | `String` | Stores the name information for Resource. |
| `TYPE` | `VARCHAR2(255)` | `String` | Stores the type information for Resource. |
| `LOCATION` | `VARCHAR2(255)` | `String` | Stores the location information for Resource. |
| `STATUS` | `VARCHAR2(255)` | `String` | Stores the status information for Resource. |
| `ASSIGNEDTO` | `VARCHAR2(255)` | `String` | Stores the assignedTo information for Resource. |

---

