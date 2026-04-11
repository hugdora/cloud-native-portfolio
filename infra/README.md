# AWS Static Website Infrastructure

## Overview

This infrastructure hosts a static website using AWS S3 and CloudFront.

## Architecture

* S3 bucket stores website files
* Bucket is private (no public access)
* CloudFront distributes content globally
* Origin Access Control (OAC) allows CloudFront to securely access S3

## Request Flow

User → CloudFront → OAC → S3 (private)

## Architecture

This portfolio is deployed using AWS with a secure, production-grade setup:

- Static site generated using Next.js
- Hosted in a private Amazon S3 bucket
- Delivered via Amazon CloudFront (CDN)
- Access to S3 is restricted using Origin Access Control (OAC)

CloudFront is the only service allowed to retrieve content from the S3 bucket, ensuring the origin remains private and secure.

## Security

* S3 public access is blocked
* Only CloudFront can read from the bucket
* No direct public access to S3 objects

## Status

Infrastructure deployed successfully using Terraform.
