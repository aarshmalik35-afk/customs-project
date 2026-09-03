# Customs Digital Twin

A BTech project focused on combining invoice processing, customs risk assessment and shipment monitoring into a single system.

The current working part of the project takes an invoice uploaded through Power Apps, processes it through a cloud-based OCR and risk assessment pipeline, and displays the extracted information and results back in Power Apps.

The Digital Twin interface is currently under development.

## Project Overview

The current workflow is:

```text
Power Apps
    ↓
Power Automate
    ↓
AWS Elastic Beanstalk
    ↓
FastAPI
    ↓
OpenCV + Tesseract OCR
    ↓
Field Extraction
    ↓
Risk Scoring
    ↓
JSON Response
    ↓
Power Automate
    ↓
Excel / OneDrive
    ↓
Power Apps
```

## Features

### Invoice OCR

Invoices uploaded through Power Apps are sent to the backend as Base64 encoded images.

The backend:

- preprocesses the invoice using OpenCV
- performs OCR using Tesseract
- extracts relevant fields from the OCR text
- calculates an extraction confidence score
- calculates a risk score
- generates a shipment decision

### Field Extraction

The system currently extracts fields such as:

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

### Risk Assessment

The current risk engine is rule-based.

It checks for things such as:

- missing important invoice fields
- high-risk countries
- shipment value
- invalid weights
- net weight exceeding gross weight

The risk score is calculated dynamically based on the extracted invoice data.

Risk levels are currently:

```text
0 - 29     LOW
30 - 59    MEDIUM
60 - 100   HIGH
```

The system also generates a decision:

```text
AUTO APPROVE
REVIEW RECOMMENDED
MANUAL REVIEW
```

The confidence score currently represents the percentage of expected fields successfully extracted from the invoice.

## Power Apps Integration

Power Apps is being used as the main user interface.

The invoice is uploaded through Power Apps and passed to Power Automate.

Power Automate sends the invoice to the AWS backend and receives the processed JSON response.

The returned information is then stored in Excel through Power Automate and displayed on the results screen in Power Apps.

## AWS Backend

The Python backend is hosted on AWS Elastic Beanstalk using FastAPI.

The main API endpoints are:

```text
GET  /
POST /process-invoice
POST /process-invoice-base64
```

`/process-invoice-base64` is the endpoint currently used by the Power Automate workflow.

Swagger documentation is also available through the FastAPI `/docs` endpoint.

## Digital Twin

A Three.js-based Digital Twin interface is also part of the project.

The planned interface includes shipment and container information such as:

- container status
- temperature
- humidity
- vibration
- shock events
- door status
- seal status
- container tilt
- location
- risk level
- shipment status
- voyage progress
- alerts

This part of the project is **still under development** and is not currently fully functional.

## Tech Stack

### Frontend

- Microsoft Power Apps
- HTML
- CSS
- JavaScript
- Three.js

### Backend

- Python
- FastAPI
- OpenCV
- Tesseract OCR
- Python Regex

### Automation & Storage

- Microsoft Power Automate
- Microsoft Excel
- Microsoft OneDrive

### Cloud

- AWS Elastic Beanstalk
- Amazon Linux 2023

### Data Format

- JSON
- Base64

## Backend Structure

```text
backend/
│
├── app.py
├── ocr.py
├── extract_fields.py
├── risk_scoring.py
├── requirements.txt
├── Procfile
│
└── .ebextensions/
    └── 01_tesseract.config
```

### `app.py`

Contains the FastAPI application and API endpoints.

### `ocr.py`

Handles image preprocessing and OCR using OpenCV and Tesseract.

### `extract_fields.py`

Extracts the required invoice fields from the OCR output.

### `risk_scoring.py`

Contains the rule-based risk scoring, confidence calculation and decision logic.

## Project Status

The project is currently under development.

### Working

- Invoice upload through Power Apps
- Power Automate workflow
- Cloud-based OCR
- Invoice field extraction
- Dynamic risk scoring
- Extraction confidence scoring
- Shipment decision generation
- AWS deployment
- Excel/OneDrive integration
- Results displayed in Power Apps
- Base64 API integration

### Under Development

- Digital Twin page
- Container visualization
- Telemetry integration
- Historical shipment data
- More advanced risk analysis
- Additional validation and error handling

## Demo

The current prototype is available through Microsoft Power Apps.

[Open Power Apps Prototype](https://make.powerapps.com/e/Default-8bd72607-37d9-424b-a1d9-40f9eda3dd25/canvas/?action=edit&app-id=%2Fproviders%2FMicrosoft.PowerApps%2Fapps%2F1b76034c-f987-4597-aecc-e0a27ba45f4a)

The application is still under development, and the Digital Twin page is not yet fully functional.

## Future Work

Some planned improvements include:

- connecting real container sensor data
- adding historical shipment tracking
- improving invoice extraction accuracy
- adding anomaly detection
- improving the risk model
- adding authentication to the API
- moving from Excel to a dedicated database
- improving the Digital Twin visualization

## Project Goal

The goal of the project is to build a system that can connect document processing and customs risk assessment with shipment monitoring, rather than treating each part as a separate workflow.
