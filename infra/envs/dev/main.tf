provider "aws" {
  region = var.aws_region
}

module "site" {
  source      = "../../modules/s3_site"
  bucket_name = "your-portfolio-dev-bucket-123"
}