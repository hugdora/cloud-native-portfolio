# Cloud-Native Static Platform on AWS

## Overview

Designed and deployed a secure, globally distributed static platform using AWS services and Infrastructure as Code (Terraform). The platform delivers a production-ready web application with high availability, HTTPS, and controlled origin access.

## Problem

Traditional static website hosting using public S3 buckets exposes content directly to the internet and lacks proper security controls. The goal was to build a secure, scalable, and production-grade delivery system using modern cloud practices.

## Solution

Implemented a cloud-native architecture where CloudFront acts as the entry point for all user traffic, while the S3 bucket remains private and accessible only through Origin Access Control (OAC).

## Architecture

User → Route 53 → CloudFront → S3 (private via OAC)

## Key Features

* Private S3 bucket with public access fully blocked
* CloudFront CDN for global content delivery
* Origin Access Control (OAC) to restrict direct S3 access
* HTTPS enabled using AWS Certificate Manager (ACM)
* Custom domain configured via Route 53
* Static site generated with Next.js and deployed to S3
* Infrastructure fully provisioned using Terraform

## Technologies Used

* AWS S3
* AWS CloudFront
* AWS Route 53
* AWS Certificate Manager (ACM)
* Terraform
* Next.js

## Outcome

Delivered a secure, scalable, and cost-efficient platform for static web hosting, following industry best practices. The architecture ensures that all content is served through CloudFront, improving performance while maintaining strict access control to the origin.

## Repository

[GitHub Repo](https://github.com/hugdora/cloud-native-portfolio)
