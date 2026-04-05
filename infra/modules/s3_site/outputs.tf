output "bucket_name" {
  value = aws_s3_bucket.site.id
}

output "bucket_arn" {
  value = aws_s3_bucket.site.arn
}

output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.cdn.domain_name
}