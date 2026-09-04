resource "azurerm_resource_group" "main" {
  name     = var.resource_group_name
  location = var.location
}

resource "azurerm_service_plan" "api" {
  name                = var.app_service_plan_name
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location

  os_type  = "Linux"
  sku_name = "B1"
}

resource "azurerm_linux_web_app" "api" {
  name                = var.api_app_name
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  service_plan_id     = azurerm_service_plan.api.id

  https_only = true

  site_config {
    always_on = false

    application_stack {
      node_version = var.node_version
    }
  }

  app_settings = {
    WEBSITE_RUN_FROM_PACKAGE = "1"
  }
}

resource "azurerm_static_web_app" "ui" {
  name                = var.static_web_app_name
  resource_group_name = azurerm_resource_group.main.name

  # Static Web Apps do not support South India
  location = "eastasia"

  sku_tier = "Free"
  sku_size = "Free"
}