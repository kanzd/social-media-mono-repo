#!/bin/bash

DOMAIN="hik8.com"
EMAIL="companyhik8@gmail.com"

# Run Certbot to obtain a certificate
#certbot certonly --standalone -d "localhost" --non-interactive --agree-tos -m "companyhik8@gmail.com"
penssl genpkey -algorithm RSA -out /etc/ssl/localcerts/localhost-key.pem -pkeyopt rsa_keygen_bits:2048 && \ openssl req -new -key /etc/ssl/localcerts/localhost-key.pem -out /etc/ssl/localcerts/localhost-csr.pem -subj "/C=US/ST=State/L=City/O=Organization/OU=OrgUnit/CN=localhost" && \ openssl x509 -req -in /etc/ssl/localcerts/localhost-csr.pem -signkey /etc/ssl/localcerts/localhost-key.pem -out /etc/ssl/localcerts/localhost-cert.pem
# Show where the cert is stored
echo "Certificate and keys are stored in /etc/letsencrypt/live/$DOMAIN/"
