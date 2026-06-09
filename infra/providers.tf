terraform {
  required_version = ">= 1.6"
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 5.60" }
    tls = { source = "hashicorp/tls", version = "~> 4.0" }
  }
}

provider "aws" {
  region = var.aws_region
}

# CloudFront requires its ACM certificate in us-east-1, regardless of site region.
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}
