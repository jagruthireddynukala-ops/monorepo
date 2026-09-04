output "resource_group_name" {
  description = "Azure Resource Group name"
  value       = azurerm_resource_group.main.name
}

output "api_app_name" {
  description = "Azure API App Service name"
  value       = azurerm_linux_web_app.api.name
}

output "api_url" {
  description = "Azure API URL"
  value       = "https://${azurerm_linux_web_app.api.default_hostname}"
}

output "ui_url" {
  description = "Azure Static Web App URL"
  value       = "https://${azurerm_static_web_app.ui.default_host_name}"
}

output "static_web_app_api_key" {
  description = "Deployment token for Azure Static Web App"
  value       = azurerm_static_web_app.ui.api_key
  sensitive   = true
}