# Linux ARMv8
FROM ubuntu:22.04 AS build
      
ENV MONERO_VERSION=0.18.3.1 MONERO_SHA256=445032e88dc07e51ac5fff7034752be530d1c4117d8d605100017bcd87c7b21f

RUN apt-get update && apt-get install -y curl bzip2

WORKDIR /root

RUN curl https://dlsrc.getmonero.org/cli/monero-linux-armv8-v$MONERO_VERSION.tar.bz2 -O &&\
  echo "$MONERO_SHA256  monero-linux-armv8-v$MONERO_VERSION.tar.bz2" | sha256sum -c - &&\
  tar -xvf monero-linux-armv8-v$MONERO_VERSION.tar.bz2 &&\
  rm monero-linux-armv8-v$MONERO_VERSION.tar.bz2 &&\
  cp ./monero-aarch64-linux-gnu-v$MONERO_VERSION/monerod . &&\
  rm -r monero-*

FROM ubuntu:22.04

RUN useradd -ms /bin/bash monero && mkdir -p /home/monero/.bitmonero && chown -R monero:monero /home/monero/.bitmonero
USER monero
WORKDIR /home/monero

COPY --chown=monero:monero --from=build /root/monerod /home/monero/monerod

# blockchain location
VOLUME /home/monero/.bitmonero

EXPOSE 38080 38081

ENTRYPOINT ["./monerod"]
CMD ["--non-interactive", "--config-file=/home/monero/.bitmonero/stagenet.conf"]