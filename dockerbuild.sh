#!/usr/bin/env bash
docker stop webapi-precious-eva
docker image rm webapi-eva:latest
docker build --tag webapi-eva:latest . > dockerbuild.log