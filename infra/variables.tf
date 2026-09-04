variable "subscription_id" {
  description = "Azure subscription ID"
  type        = string
  sensitive   = true
}

variable "location" {
  description = "Azure region where resources will be created"
  type        = string
  default     = "South India"
}

variable "resource_group_name" {
  description = "Name of the Azure resource group"
  type        = string
  default     = "rg-ui-api-cicd"
}

variable "app_service_plan_name" {
  description = "Name of the App Service Plan"
  type        = string
  default     = "asp-ui-api-cicd"
}

variable "api_app_name" {
  description = "Globally unique name of the Azure API App Service"
  type        = string
}

variable "static_web_app_name" {
  description = "Globally unique name of the Azure Static Web App"
  type        = string
}

variable "node_version" {
  description = "Node.js version for the API App Service"
  type        = string
  default     = "22-lts"
}
