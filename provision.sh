#!/usr/bin/env bash
apt-get update

#install any binaries for compiling from source
apt-get install -y build-essential

#install apache utilities
apt-get install -y apache2-utils

#install git-scm
apt-get install -y git

#install utilities
apt-get install -y unzip

apt-get install -y memcached

sudo timedatectl set-timezone America/New_York

#install node
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
apt-get install -y nodejs

#cd /var/www
#cp .env.example .env