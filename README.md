# Customs Digital Twin

A BTech project that combines invoice OCR, customs risk assessment, shipment telemetry and a 3D digital twin into one system.

The idea is to take information that would normally be handled separately — invoice data, shipment risk and container status — and bring it into one dashboard.

## What it does

The current system has two main parts:

1. Invoice processing
2. Digital Twin dashboard

### Invoice Processing

An invoice can be uploaded from the Power Apps interface. Power Automate sends the image to the backend hosted on AWS.

The backend then:

- preprocesses the image using OpenCV
- extracts text using Tesseract OCR
- extracts relevant invoice fields using regex
- calculates an extraction confidence score
- calculates a customs risk score
- generates a shipment decision

The extracted information is then returned as JSON and stored in an Excel table through Power Automate.

Current extracted fields include:

- Invoice Number
- Invoice Date
- Air Waybill
- HTS Code
- Country
- Gross Weight
- Net Weight
- Total Value
- Shipper
- Consignee
- Fax

## Risk Scoring

The current risk engine is rule based.

Some of the checks include:

- missing invoice number
- missing Air Waybill
- missing country
- missing shipment value
- missing shipper/consignee information
- high risk origin countries
- shipment value
- invalid weights
- net weight greater than gross weight

The final score is between 0 and 100.

```text
0 - 29     LOW
30 - 59    MEDIUM
60 - 100   HIGH
                         ┌─────────────────────┐
                         │ Excel / OneDrive    │
                         │ Shipment Records    │
                         └─────────────────────┘
