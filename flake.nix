{
  description = "T3 Stack with Monero Flake";
  inputs = { nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable-small"; };

  outputs = { nixpkgs, ... }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
    in {
      devShells.${system}.default = with pkgs;
        mkShell {
          nativeBuildInputs = [ bashInteractive ];
          buildInputs = [
            nodejs_20
            nodePackages.prisma
            prisma-engines
            nodePackages.yarn
            monero-cli
            openssl
          ];
          shellHook = ''
            export BROWSER=none
            export NODE_OPTIONS="--no-experimental-fetch"
            export PRISMA_QUERY_ENGINE_BINARY="${prisma-engines}/bin/query-engine"
            export PRISMA_QUERY_ENGINE_LIBRARY="${prisma-engines}/lib/libquery_engine.node"
            export PRISMA_INTROSPECTION_ENGINE_BINARY="${prisma-engines}/bin/introspection-engine"
            export PRISMA_FMT_BINARY="${prisma-engines}/bin/prisma-fmt"
            export PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING="true"
          '';
          packages = [ bun ];
        };
    };
}
