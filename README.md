# Employee Leave Management Application

A simple Employee Leave Management application built using Node.js, Express.js, HTML, CSS, JavaScript, Terraform, Azure, and GitHub Actions.

The application allows employees to submit leave requests using their **Employee Name** and **Unique Employee ID**.

There is **no login page** in this application.

---

## Project Architecture

```text
                         GitHub Repository
                                |
                                v
                         GitHub Actions
                                |
             +------------------+------------------+
             |                  |                  |
             v                  v                  v
           UI Build          API Build       Terraform
             |                  |                  |
             |                  |          Infrastructure
             |                  |                  |
             v                  v                  v
      Azure Static Web App  Azure App Service    Azure Resources
             |                  |                  |
             +------------------+------------------+
                                |
                                v
                     Employee Leave Application
```

---

# Project Structure

```text
employee-leave-project/
│
├── .github/
│   └── workflows/
│       └── pipeline.yml
│
├── api/
│   ├── build.js
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── ui/
│   ├── build.js
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   │
│   └── public/
│       ├── index.html
│       ├── app.js
│       └── style.css
│
├── infra/
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   ├── providers.tf
│   └── other Terraform files
│
├── .gitignore
└── README.md
```

---

# Technologies Used

## Frontend

- HTML
- CSS
- JavaScript
- Express.js static server

## Backend

- Node.js
- Express.js
- CORS

## Infrastructure

- Terraform
- Microsoft Azure

## CI/CD

- GitHub Actions

---

# Application Features

The application provides:

- Employee leave application
- Employee Name input
- Employee Unique ID input
- Leave Type
- From Date
- To Date
- Leave Reason
- Leave request submission
- Leave approval
- Leave rejection
- Leave deletion
- Leave dashboard
- Employee information
- API health check

---

# Employee Identification

The employee does not select an employee from a dropdown.

The employee enters:

```text
Employee Name
Employee Unique ID
```

Example:

```text
Employee Name: Jagruthi
Employee Unique ID: EMP001
```

The API verifies that both values belong to the same employee.

Example:

```text
Jagruthi → EMP001
Rahul    → EMP002
Priya    → EMP003
Arjun    → EMP004
```

If the name and unique ID do not match, the API rejects the leave request.

---

# API

The backend is a Node.js and Express.js application.

Local API URL:

```text
http://localhost:3000
```

API base URL:

```text
http://localhost:3000/api
```

---

# API Endpoints

## 1. Health Check

```text
GET /api/health
```

PowerShell:

```powershell
Invoke-RestMethod http://localhost:3000/api/health
```

---

## 2. Dashboard

```text
GET /api/dashboard
```

PowerShell:

```powershell
Invoke-RestMethod http://localhost:3000/api/dashboard
```

---

## 3. Get Employees

```text
GET /api/employees
```

PowerShell:

```powershell
Invoke-RestMethod http://localhost:3000/api/employees
```

---

## 4. Get Employee

```text
GET /api/employees/:id
```

Example:

```powershell
Invoke-RestMethod http://localhost:3000/api/employees/1
```

---

## 5. Get All Leaves

```text
GET /api/leaves
```

PowerShell:

```powershell
Invoke-RestMethod http://localhost:3000/api/leaves
```

---

## 6. Get One Leave

```text
GET /api/leaves/:id
```

Example:

```powershell
Invoke-RestMethod http://localhost:3000/api/leaves/1
```

---

# Create Leave Request

Endpoint:

```text
POST /api/leaves
```

Request body:

```json
{
  "employeeName": "Jagruthi",
  "employeeUniqueId": "EMP001",
  "leaveType": "Casual Leave",
  "fromDate": "2026-09-20",
  "toDate": "2026-09-21",
  "reason": "Personal work"
}
```

PowerShell:

```powershell
$body = @{
    employeeName = "Jagruthi"
    employeeUniqueId = "EMP001"
    leaveType = "Casual Leave"
    fromDate = "2026-09-20"
    toDate = "2026-09-21"
    reason = "Personal work"
} | ConvertTo-Json

Invoke-RestMethod `
    -Uri "http://localhost:3000/api/leaves" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body
```

---

# Approve Leave

Endpoint:

```text
PUT /api/leaves/:id/approve
```

Example:

```powershell
Invoke-RestMethod `
    -Uri "http://localhost:3000/api/leaves/1/approve" `
    -Method PUT
```

---

# Reject Leave

Endpoint:

```text
PUT /api/leaves/:id/reject
```

Example:

```powershell
Invoke-RestMethod `
    -Uri "http://localhost:3000/api/leaves/1/reject" `
    -Method PUT
```

---

# Delete Leave

Endpoint:

```text
DELETE /api/leaves/:id
```

Example:

```powershell
Invoke-RestMethod `
    -Uri "http://localhost:3000/api/leaves/1" `
    -Method DELETE
```

---

# Run API Locally

Open PowerShell.

Go to the API folder:

```powershell
cd api
```

Install dependencies:

```powershell
npm install
```

Build the API:

```powershell
npm run build
```

Start the API:

```powershell
npm start
```

The API will run on:

```text
http://localhost:3000
```

---

# UI

The frontend is located inside:

```text
ui/public/
```

The main files are:

```text
index.html
app.js
style.css
```

The UI communicates with the API using HTTP requests.

```text
Browser
   |
   | HTTP
   v
UI
   |
   | API requests
   v
API
   |
   v
Leave data
```

---

# Run UI Locally

Open another PowerShell terminal.

Go to the UI folder:

```powershell
cd ui
```

Install dependencies:

```powershell
npm install
```

Build the UI:

```powershell
npm run build
```

Start the UI:

```powershell
npm start
```

Open the browser:

```text
http://localhost:3001
```

---

# Local Application

When running locally:

```text
UI
http://localhost:3001

        |
        | API requests
        v

API
http://localhost:3000/api
```

---

# Build Scripts

Both UI and API contain a build script.

## API

```text
api/package.json
        |
        v
npm run build
        |
        v
node build.js
```

## UI

```text
ui/package.json
        |
        v
npm run build
        |
        v
node build.js
```

---

# Terraform Infrastructure

Terraform configuration is stored in:

```text
infra/
```

Terraform is responsible for creating and managing Azure infrastructure.

Typical Terraform workflow:

```text
terraform init
        |
        v
terraform validate
        |
        v
terraform plan
        |
        v
terraform apply
```

---

# Terraform Commands

Go to the infrastructure folder:

```powershell
cd infra
```

Initialize Terraform:

```powershell
terraform init
```

Format Terraform files:

```powershell
terraform fmt -recursive
```

Validate Terraform:

```powershell
terraform validate
```

Create execution plan:

```powershell
terraform plan
```

Apply infrastructure:

```powershell
terraform apply
```

Destroy infrastructure:

```powershell
terraform destroy
```

---

# Terraform Outputs

After Terraform deployment:

```powershell
terraform output
```

If a deployment token is exposed as an output:

```powershell
terraform output -raw static_web_app_api_key
```

Use the output only where required and do not commit secrets to Git.

---

# GitHub Actions

The CI/CD pipeline is located at:

```text
.github/workflows/pipeline.yml
```

The pipeline contains five major jobs:

```text
1. Build API
       |
       v
2. Build UI
       |
       v
3. Terraform Infrastructure
       |
       +----------------+
       |                |
       v                v
4. Deploy API      5. Deploy UI
```

---

# CI/CD Pipeline Flow

When code is pushed to the `main` branch:

```text
git push
   |
   v
GitHub Actions
   |
   +----------------------+
   |                      |
   v                      v
Build API              Build UI
   |                      |
   v                      v
npm ci                  npm ci
   |                      |
   v                      v
npm run build           npm run build
   |                      |
   +----------+-----------+
              |
              v
        Terraform
              |
              v
       terraform init
              |
              v
       terraform validate
              |
              v
       terraform plan
              |
              v
       terraform apply
              |
       +------+------+
       |             |
       v             v
   Deploy API    Deploy UI
       |             |
       v             v
 Azure App       Azure Static
  Service        Web App
```

---

# GitHub Repository Secrets

The following secrets are required for deployment.

Go to:

```text
GitHub
→ Repository
→ Settings
→ Secrets and variables
→ Actions
```

Create:

```text
AZURE_CREDENTIALS
API_APP_NAME
UI_DEPLOYMENT_TOKEN
```

---

# AZURE_CREDENTIALS

This secret contains the Azure service principal credentials used by GitHub Actions.

Example format:

```json
{
  "clientId": "YOUR_CLIENT_ID",
  "clientSecret": "YOUR_CLIENT_SECRET",
  "subscriptionId": "YOUR_SUBSCRIPTION_ID",
  "tenantId": "YOUR_TENANT_ID"
}
```

Do not commit this information into GitHub source code.

---

# API_APP_NAME

This is the Azure App Service name where the API is deployed.

Example:

```text
employee-leave-api
```

Use the actual App Service name created by Terraform.

---

# UI_DEPLOYMENT_TOKEN

This is the deployment token for the Azure Static Web App.

If Terraform provides the token as an output:

```powershell
cd infra
terraform output -raw static_web_app_api_key
```

Copy the value and save it as:

```text
UI_DEPLOYMENT_TOKEN
```

in GitHub Actions secrets.

---

# .gitignore

The project ignores files that should not be committed.

Important ignored files include:

```text
node_modules/
.terraform/
*.tfstate
*.tfstate.*
terraform.tfvars
.env
*.zip
```

Never commit secrets, Terraform state, or `node_modules`.

---

# Git Commands

Check repository status:

```powershell
git status
```

Add files:

```powershell
git add .
```

Commit:

```powershell
git commit -m "Add employee leave management application"
```

Push:

```powershell
git push origin main
```

---

# Testing

## Test API

Start API:

```powershell
cd api
npm start
```

Then:

```powershell
Invoke-RestMethod http://localhost:3000/api/health
```

---

## Test UI

Start UI:

```powershell
cd ui
npm start
```

Open:

```text
http://localhost:3001
```

---

# Test Leave Submission

Use:

```text
Employee Name:
Jagruthi

Employee Unique ID:
EMP001

Leave Type:
Casual Leave

From Date:
2026-09-20

To Date:
2026-09-21

Reason:
Personal work
```

Submit the request.

The UI sends the request to:

```text
POST /api/leaves
```

The API verifies:

```text
Jagruthi + EMP001
```

If the employee exists, the leave request is created with:

```text
Status: Pending
```

---

# Invalid Employee Test

Try:

```text
Employee Name:
Jagruthi

Employee Unique ID:
EMP002
```

This should fail because:

```text
Jagruthi → EMP001
Rahul    → EMP002
```

The API should return:

```text
Employee Name and Unique ID do not match
```

---

# Deployment Architecture

The final Azure architecture is:

```text
                       Azure
                         |
          +--------------+--------------+
          |                             |
          v                             v
 Azure Static Web App             Azure App Service
          |                             |
          |                             |
         UI                            API
          |                             |
          +-------------+---------------+
                        |
                        v
                Leave Management
                  Application
```

GitHub Actions manages the deployment:

```text
GitHub
  |
  v
GitHub Actions
  |
  +---- UI ------> Azure Static Web App
  |
  +---- API -----> Azure App Service
  |
  +---- Infra ---> Terraform ---> Azure
```

---

# Troubleshooting

## Build.js not found

Check API:

```powershell
cd api
dir build.js
```

Check UI:

```powershell
cd ui
dir build.js
```

Both files must exist.

---

## UI Build Error

Run:

```powershell
cd ui
npm install
npm run build
```

The UI build script checks:

```text
public/index.html
public/app.js
public/style.css
```

---

## API Build Error

Run:

```powershell
cd api
npm install
npm run build
```

The API build script checks:

```text
server.js
```

---

## API Connection Error

If the browser shows:

```text
ERR_CONNECTION_REFUSED
```

make sure the API is running:

```powershell
cd api
npm start
```

Then test:

```powershell
Invoke-RestMethod http://localhost:3000/api/health
```

---

## UI Connection Error

Make sure the UI is running:

```powershell
cd ui
npm start
```

Then open:

```text
http://localhost:3001
```

---

# Important Security Rules

Do not commit the following:

```text
.env
terraform.tfvars
*.tfstate
Azure credentials
Service principal secrets
API keys
Passwords
Connection strings
```

Use GitHub Secrets and Azure Key Vault for sensitive values where required.

---

# Summary

This project contains:

```text
✓ Employee Leave Management UI
✓ Node.js Express API
✓ Employee Name + Unique ID validation
✓ Leave creation
✓ Leave approval
✓ Leave rejection
✓ Leave deletion
✓ Dashboard
✓ API health check
✓ UI build script
✓ API build script
✓ Terraform infrastructure
✓ GitHub Actions CI/CD
✓ Azure App Service deployment
✓ Azure Static Web App deployment
✓ .gitignore
✓ README documentation
```

The complete CI/CD process is:

```text
Developer
    |
    v
Git Push
    |
    v
GitHub
    |
    v
GitHub Actions
    |
    +-------------------+
    |                   |
    v                   v
   UI                  API
 Build                Build
    |                   |
    +---------+---------+
              |
              v
         Terraform
              |
              v
        Azure Resources
              |
       +------+------+
       |             |
       v             v
      UI             API
 Static Web App   App Service
```