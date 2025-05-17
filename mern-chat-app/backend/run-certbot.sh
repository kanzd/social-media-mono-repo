#!/bin/bash

DOMAIN="localhost"
EMAIL="companyhik8@gmail.com"

# Run Certbot to obtain a certificate
certbot certonly --standalone \
  -d "$DOMAIN" \
  --non-interactive \
  --agree-tos \
  -m "$EMAIL"

# Show where the cert is stored
echo "Certificate and keys are stored in /etc/letsencrypt/live/$DOMAIN/"